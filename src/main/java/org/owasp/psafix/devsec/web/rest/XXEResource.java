package org.owasp.psafix.devsec.web.rest;

import org.owasp.psafix.devsec.domain.OwaspComments;
import org.owasp.psafix.devsec.security.AuthoritiesConstants;
import org.owasp.psafix.devsec.security.SecurityUtils;
import org.owasp.psafix.devsec.service.OwaspCommentsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;
import java.time.LocalDate;
import java.util.List;

/**
 *
 */
@RestController
@RequestMapping("/api/owasp")
public class XXEResource {

    private final OwaspCommentsService owaspCommentsService;

    public XXEResource(OwaspCommentsService owaspCommentsService) {
        this.owaspCommentsService = owaspCommentsService;
    }

    @PostMapping("/xxe")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public List<OwaspComments> saveComment(@RequestParam("file") MultipartFile file) throws Exception {
        XPathFactory xpathfactory = XPathFactory.newInstance();
        XPath xpath = xpathfactory.newXPath();
        Object result = xpath.evaluate("//comments/comment/text()", new InputSource(file.getInputStream()), XPathConstants.NODESET);
        if (result instanceof NodeList) {
            NodeList nodes = (NodeList)result;
            for (int i = 0; i<nodes.getLength();i++) {
                OwaspComments comments = new OwaspComments();
                comments
                    .author(SecurityUtils.getCurrentUserLogin().orElse("unknwown"))
                    .comment(nodes.item(i).getNodeValue())
                    .commentDate(LocalDate.now());
                owaspCommentsService.save(comments);

            }
        }
        return owaspCommentsService.findAll();
    }
}
