package org.owasp.psafix.devsec.web.rest;

import org.owasp.psafix.devsec.domain.OwaspComments;
import org.owasp.psafix.devsec.service.OwaspCommentsService;
import org.owasp.psafix.devsec.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.owasp.psafix.devsec.domain.OwaspComments}.
 */
@RestController
@RequestMapping("/api")
public class OwaspCommentsResource {

    private final Logger log = LoggerFactory.getLogger(OwaspCommentsResource.class);

    private static final String ENTITY_NAME = "owaspComments";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OwaspCommentsService owaspCommentsService;

    public OwaspCommentsResource(OwaspCommentsService owaspCommentsService) {
        this.owaspCommentsService = owaspCommentsService;
    }

    /**
     * {@code POST  /owasp-comments} : Create a new owaspComments.
     *
     * @param owaspComments the owaspComments to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new owaspComments, or with status {@code 400 (Bad Request)} if the owaspComments has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/owasp-comments")
    public ResponseEntity<OwaspComments> createOwaspComments(@RequestBody OwaspComments owaspComments) throws URISyntaxException {
        log.debug("REST request to save OwaspComments : {}", owaspComments);
        if (owaspComments.getId() != null) {
            throw new BadRequestAlertException("A new owaspComments cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OwaspComments result = owaspCommentsService.save(owaspComments);
        return ResponseEntity.created(new URI("/api/owasp-comments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /owasp-comments} : Updates an existing owaspComments.
     *
     * @param owaspComments the owaspComments to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated owaspComments,
     * or with status {@code 400 (Bad Request)} if the owaspComments is not valid,
     * or with status {@code 500 (Internal Server Error)} if the owaspComments couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/owasp-comments")
    public ResponseEntity<OwaspComments> updateOwaspComments(@RequestBody OwaspComments owaspComments) throws URISyntaxException {
        log.debug("REST request to update OwaspComments : {}", owaspComments);
        if (owaspComments.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OwaspComments result = owaspCommentsService.save(owaspComments);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, owaspComments.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /owasp-comments} : get all the owaspComments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of owaspComments in body.
     */
    @GetMapping("/owasp-comments")
    public List<OwaspComments> getAllOwaspComments() {
        log.debug("REST request to get all OwaspComments");
        return owaspCommentsService.findAll();
    }

    /**
     * {@code GET  /owasp-comments/:id} : get the "id" owaspComments.
     *
     * @param id the id of the owaspComments to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the owaspComments, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/owasp-comments/{id}")
    public ResponseEntity<OwaspComments> getOwaspComments(@PathVariable Long id) {
        log.debug("REST request to get OwaspComments : {}", id);
        Optional<OwaspComments> owaspComments = owaspCommentsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(owaspComments);
    }

    /**
     * {@code DELETE  /owasp-comments/:id} : delete the "id" owaspComments.
     *
     * @param id the id of the owaspComments to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/owasp-comments/{id}")
    public ResponseEntity<Void> deleteOwaspComments(@PathVariable Long id) {
        log.debug("REST request to delete OwaspComments : {}", id);
        owaspCommentsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
