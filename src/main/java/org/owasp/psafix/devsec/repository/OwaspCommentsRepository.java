package org.owasp.psafix.devsec.repository;

import org.owasp.psafix.devsec.domain.OwaspComments;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the OwaspComments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OwaspCommentsRepository extends JpaRepository<OwaspComments, Long> {
}
