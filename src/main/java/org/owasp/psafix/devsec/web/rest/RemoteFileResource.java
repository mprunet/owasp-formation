package org.owasp.psafix.devsec.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import org.apache.commons.lang3.StringUtils;
import org.owasp.psafix.devsec.domain.OwaspComments;
import org.owasp.psafix.devsec.domain.RemoteFile;
import org.owasp.psafix.devsec.domain.enumeration.FileType;
import org.owasp.psafix.devsec.security.AuthoritiesConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MimeType;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.PosixFilePermissions;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * REST controller for managing {@link org.owasp.psafix.devsec.domain.RemoteFile}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RemoteFileResource {

    private final Logger log = LoggerFactory.getLogger(RemoteFileResource.class);

    private static final String ENTITY_NAME = "remoteFile";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private Path rootPath;

    public RemoteFileResource() throws IOException {
        rootPath = Paths.get("data").toAbsolutePath();
        Files.createDirectories(rootPath);
        rootPath = rootPath.toRealPath();
    }

    @PostMapping("/remote-files")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public List<RemoteFile> upload(@RequestParam("path") String path, @RequestParam("file") MultipartFile file) throws Exception {
        Path targetFile = relativize(path).resolve(file.getOriginalFilename());
        Files.write(targetFile, file.getBytes());
        return getAllRemoteFiles(path);
    }

    @PostMapping("/remote-files/create-directory")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<Void> createDirectory(@RequestBody RemoteFile remoteFile) throws Exception {
        Path targetFile = relativize(remoteFile.getPath()).resolve(remoteFile.getName());
        Files.createDirectory(targetFile);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, remoteFile.getPath()+"/"+remoteFile.getName())).build();
    }



    private LocalDateTime fileTime2LocalDateTime(Path targetFile) {

        try {
            return LocalDateTime.ofInstant(Files.getLastModifiedTime(targetFile).toInstant(), ZoneId.systemDefault());
        } catch (IOException e) {
            return LocalDateTime.now();
        }
    }

    private FileType toFileType(Path path) {
        if (Files.isRegularFile(path)) {
            return FileType.REGULAR_FILE;
        } else if (Files.isDirectory(path)) {
            return FileType.DIRECTORY;
        } else if (Files.isSymbolicLink(path)) {
            return FileType.SYMLINK;
        } else {
            return FileType.OTHER;
        }
    }

    public RemoteFile pathToRemote(Path path) {
        /*
        Path realPath;
        try {
            realPath = path.toRealPath();
        } catch (IOException e) {
            realPath = path;
        }
        realPath = realPath.toAbsolutePath();

        rootPath.relativize()
        String  = StringUtils.removeStart(realPath.toString(), rootPath.toString());
        rootPath.toString().
*/
        Path relativePath = rootPath.relativize(path);
        if (relativePath.getNameCount() > 1) {
            relativePath = relativePath.subpath(0, relativePath.getNameCount() -1 );
        } else {
            relativePath=Paths.get("");
        }
        RemoteFile rf = new RemoteFile()
            .path(relativePath.toString()+"/")
            .name(path.getFileName().toString())
            .fileType(toFileType(path))
            .modification(fileTime2LocalDateTime(path));
        try {
            Set<PosixFilePermission> filePerm = Files.getPosixFilePermissions(path);
            rf.rights(PosixFilePermissions.toString(filePerm));
        } catch (IOException e) {
        }
        return rf;

    }

    private Path relativize(String path) {
        while (path.startsWith("/")) {
            path = path.substring(1);
        }
        return rootPath.resolve(path);
    }

    /**
     * {@code GET  /remote-files} : get all the remoteFiles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of remoteFiles in body.
     */
    @GetMapping("/remote-files")
    public List<RemoteFile> getAllRemoteFiles(@RequestParam("path") String path) throws IOException{
        log.debug("REST request to get all RemoteFiles");

        Comparator<RemoteFile> comparator1 = Comparator.comparingInt(rf->rf.getFileType().ordinal());
        Comparator<RemoteFile> comparator2 = Comparator.comparing(rf->rf.getName());

        Path dir = relativize(path);
        List<RemoteFile> remoteFiles = Files.list(dir)
            .map(this::pathToRemote)
            .sorted(comparator1.thenComparing(comparator2))
            .collect(Collectors.toList());
        if (!Files.isSameFile(dir, rootPath)) {
            RemoteFile rf = pathToRemote(dir);
            rf.name("");
            remoteFiles.add(0,rf);
        }
        return remoteFiles;
    }

    /**
     * {@code GET  /remote-files} : get all the remoteFiles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of remoteFiles in body.
     */
    @PostMapping(path = "/remote-files/download", produces = MediaType.ALL_VALUE)
    public ResponseEntity<ByteArrayResource> download(@RequestBody RemoteFile file) throws IOException{
        String path = file.getPath()+"/"+file.getName();
        Path filePath = relativize(path);;
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(filePath));
        String mimeType = Optional.ofNullable(URLConnection.guessContentTypeFromName(file.getName())).orElse(MimeTypeUtils.APPLICATION_OCTET_STREAM_VALUE);
        return ResponseEntity.ok()
            .contentLength(resource.contentLength())
            .header("Content-Type", mimeType)
            .header("Content-Disposition", "attachment; filename=\""+file.getName()+"\"")
            .header("Cache-Control", "no-cache, no-store, must-revalidate")
            .header("Pragma", "no-cache")
            .header("Expires", "0")
            .body(resource);
    }

}
