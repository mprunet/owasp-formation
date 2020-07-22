package org.owasp.psafix.devsec.web.rest;

import org.owasp.psafix.devsec.domain.MesContacts;
import org.owasp.psafix.devsec.repository.MesContactsRepository;
import org.owasp.psafix.devsec.security.SecurityUtils;
import org.owasp.psafix.devsec.service.UserService;
import org.owasp.psafix.devsec.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.owasp.psafix.devsec.domain.MesContacts}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MesContactsResource {

    private final Logger log = LoggerFactory.getLogger(MesContactsResource.class);

    private static final String ENTITY_NAME = "mesContacts";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MesContactsRepository mesContactsRepository;
    private final UserService userService;

    public MesContactsResource(MesContactsRepository mesContactsRepository, UserService userService) {
        this.mesContactsRepository = mesContactsRepository;
        this.userService = userService;
    }

    /**
     * {@code POST  /mes-contacts} : Create a new mesContacts.
     *
     * @param mesContacts the mesContacts to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mesContacts, or with status {@code 400 (Bad Request)} if the mesContacts has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mes-contacts")
    public ResponseEntity<MesContacts> createMesContacts(@RequestBody MesContacts mesContacts) throws URISyntaxException {
        log.debug("REST request to save MesContacts : {}", mesContacts);
        if (mesContacts.getId() != null) {
            throw new BadRequestAlertException("A new mesContacts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        mesContacts.user(userService.getUserWithAuthoritiesByLogin(SecurityUtils.getCurrentUserLogin().orElse(null)).orElse(null));
        MesContacts result = mesContactsRepository.save(mesContacts);
        return ResponseEntity.created(new URI("/api/mes-contacts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mes-contacts} : Updates an existing mesContacts.
     *
     * @param mesContacts the mesContacts to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mesContacts,
     * or with status {@code 400 (Bad Request)} if the mesContacts is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mesContacts couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mes-contacts")
    public ResponseEntity<MesContacts> updateMesContacts(@RequestBody MesContacts mesContacts) throws URISyntaxException {
        log.debug("REST request to update MesContacts : {}", mesContacts);
        if (mesContacts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MesContacts result = mesContactsRepository.save(mesContacts);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, mesContacts.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /mes-contacts} : get all the mesContacts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mesContacts in body.
     */
    @GetMapping("/mes-contacts")
    public List<MesContacts> getAllMesContacts() {
        log.debug("REST request to get all MesContacts");
        return mesContactsRepository.findByUserIsCurrentUser();
    }

    /**
     * {@code GET  /mes-contacts/:id} : get the "id" mesContacts.
     *
     * @param id the id of the mesContacts to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mesContacts, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mes-contacts/{id}")
    public ResponseEntity<MesContacts> getMesContacts(@PathVariable Long id) {
        log.debug("REST request to get MesContacts : {}", id);
        Optional<MesContacts> mesContacts = mesContactsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mesContacts);
    }

    /**
     * {@code DELETE  /mes-contacts/:id} : delete the "id" mesContacts.
     *
     * @param id the id of the mesContacts to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mes-contacts/{id}")
    public ResponseEntity<Void> deleteMesContacts(@PathVariable Long id) {
        log.debug("REST request to delete MesContacts : {}", id);
        mesContactsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
