package org.owasp.psafix.devsec.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.owasp.psafix.devsec.domain.enumeration.FileType;

/**
 * A RemoteFile.
 */
public class RemoteFile implements Serializable {

    private static final long serialVersionUID = 1L;

    private String path;

    private String name;

    private LocalDateTime modification;

    private String rights;

    private FileType fileType;

    public String getPath() {
        return path;
    }

    public RemoteFile path(String path) {
        this.path = path;
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public RemoteFile name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getModification() {
        return modification;
    }

    public RemoteFile modification(LocalDateTime modification) {
        this.modification = modification;
        return this;
    }

    public void setModification(LocalDateTime modification) {
        this.modification = modification;
    }

    public String getRights() {
        return rights;
    }

    public RemoteFile rights(String rights) {
        this.rights = rights;
        return this;
    }

    public void setRights(String rights) {
        this.rights = rights;
    }

    public FileType getFileType() {
        return fileType;
    }

    public RemoteFile fileType(FileType fileType) {
        this.fileType = fileType;
        return this;
    }

    public void setFileType(FileType fileType) {
        this.fileType = fileType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RemoteFile that = (RemoteFile) o;

        if (path != null ? !path.equals(that.path) : that.path != null) return false;
        return name != null ? name.equals(that.name) : that.name == null;
    }

    @Override
    public int hashCode() {
        int result = path != null ? path.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RemoteFile{" +
            ", path='" + getPath() + "'" +
            ", name='" + getName() + "'" +
            ", modification='" + getModification() + "'" +
            ", rights='" + getRights() + "'" +
            ", fileType='" + getFileType() + "'" +
            "}";
    }
}
