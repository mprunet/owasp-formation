package org.owasp.psafix.devsec.service;

import org.owasp.psafix.devsec.domain.OwaspComments;
import org.owasp.psafix.devsec.repository.OwaspCommentsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link OwaspComments}.
 */
@Service
@Transactional
public class OwaspCommentsService {

    private final Logger log = LoggerFactory.getLogger(OwaspCommentsService.class);

    private final OwaspCommentsRepository owaspCommentsRepository;

    public OwaspCommentsService(OwaspCommentsRepository owaspCommentsRepository) {
        this.owaspCommentsRepository = owaspCommentsRepository;
    }

    /**
     * Save a owaspComments.
     *
     * @param owaspComments the entity to save.
     * @return the persisted entity.
     */
    public OwaspComments save(OwaspComments owaspComments) {
        log.debug("Request to save OwaspComments : {}", owaspComments);
        return owaspCommentsRepository.save(owaspComments);
    }

    /**
     * Get all the owaspComments.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<OwaspComments> findAll() {
        log.debug("Request to get all OwaspComments");
        return owaspCommentsRepository.findAll();
    }


    /**
     * Get one owaspComments by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<OwaspComments> findOne(Long id) {
        log.debug("Request to get OwaspComments : {}", id);
        return owaspCommentsRepository.findById(id);
    }

    /**
     * Delete the owaspComments by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete OwaspComments : {}", id);
        owaspCommentsRepository.deleteById(id);
    }
}
