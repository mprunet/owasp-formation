package org.owasp.psafix.devsec.repository;

import org.owasp.psafix.devsec.domain.MesContacts;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the MesContacts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MesContactsRepository extends JpaRepository<MesContacts, Long> {

    @Query("select mesContacts from MesContacts mesContacts where mesContacts.user.login = ?#{principal.username}")
    List<MesContacts> findByUserIsCurrentUser();
}
