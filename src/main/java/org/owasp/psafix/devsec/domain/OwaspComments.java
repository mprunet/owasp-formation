package org.owasp.psafix.devsec.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A OwaspComments.
 */
@Entity
@Table(name = "owasp_comments")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class OwaspComments implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comment_date")
    private LocalDate commentDate;

    @Lob
    @Column(name = "comment")
    private String comment;

    @Column(name = "author")
    private String author;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCommentDate() {
        return commentDate;
    }

    public OwaspComments commentDate(LocalDate commentDate) {
        this.commentDate = commentDate;
        return this;
    }

    public void setCommentDate(LocalDate commentDate) {
        this.commentDate = commentDate;
    }

    public String getComment() {
        return comment;
    }

    public OwaspComments comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getAuthor() {
        return author;
    }

    public OwaspComments author(String author) {
        this.author = author;
        return this;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OwaspComments)) {
            return false;
        }
        return id != null && id.equals(((OwaspComments) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OwaspComments{" +
            "id=" + getId() +
            ", commentDate='" + getCommentDate() + "'" +
            ", comment='" + getComment() + "'" +
            ", author='" + getAuthor() + "'" +
            "}";
    }
}
