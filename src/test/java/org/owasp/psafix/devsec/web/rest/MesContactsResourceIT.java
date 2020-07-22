package org.owasp.psafix.devsec.web.rest;

import org.owasp.psafix.devsec.DevsecApp;
import org.owasp.psafix.devsec.domain.MesContacts;
import org.owasp.psafix.devsec.repository.MesContactsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MesContactsResource} REST controller.
 */
@SpringBootTest(classes = DevsecApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MesContactsResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_FIXE = "AAAAAAAAAA";
    private static final String UPDATED_FIXE = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE = "BBBBBBBBBB";

    @Autowired
    private MesContactsRepository mesContactsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMesContactsMockMvc;

    private MesContacts mesContacts;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MesContacts createEntity(EntityManager em) {
        MesContacts mesContacts = new MesContacts()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .email(DEFAULT_EMAIL)
            .fixe(DEFAULT_FIXE)
            .mobile(DEFAULT_MOBILE);
        return mesContacts;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MesContacts createUpdatedEntity(EntityManager em) {
        MesContacts mesContacts = new MesContacts()
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .email(UPDATED_EMAIL)
            .fixe(UPDATED_FIXE)
            .mobile(UPDATED_MOBILE);
        return mesContacts;
    }

    @BeforeEach
    public void initTest() {
        mesContacts = createEntity(em);
    }

    @Test
    @Transactional
    public void createMesContacts() throws Exception {
        int databaseSizeBeforeCreate = mesContactsRepository.findAll().size();
        // Create the MesContacts
        restMesContactsMockMvc.perform(post("/api/mes-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mesContacts)))
            .andExpect(status().isCreated());

        // Validate the MesContacts in the database
        List<MesContacts> mesContactsList = mesContactsRepository.findAll();
        assertThat(mesContactsList).hasSize(databaseSizeBeforeCreate + 1);
        MesContacts testMesContacts = mesContactsList.get(mesContactsList.size() - 1);
        assertThat(testMesContacts.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testMesContacts.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testMesContacts.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testMesContacts.getFixe()).isEqualTo(DEFAULT_FIXE);
        assertThat(testMesContacts.getMobile()).isEqualTo(DEFAULT_MOBILE);
    }

    @Test
    @Transactional
    public void createMesContactsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mesContactsRepository.findAll().size();

        // Create the MesContacts with an existing ID
        mesContacts.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMesContactsMockMvc.perform(post("/api/mes-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mesContacts)))
            .andExpect(status().isBadRequest());

        // Validate the MesContacts in the database
        List<MesContacts> mesContactsList = mesContactsRepository.findAll();
        assertThat(mesContactsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMesContacts() throws Exception {
        // Initialize the database
        mesContactsRepository.saveAndFlush(mesContacts);

        // Get all the mesContactsList
        restMesContactsMockMvc.perform(get("/api/mes-contacts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mesContacts.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].fixe").value(hasItem(DEFAULT_FIXE)))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE)));
    }
    
    @Test
    @Transactional
    public void getMesContacts() throws Exception {
        // Initialize the database
        mesContactsRepository.saveAndFlush(mesContacts);

        // Get the mesContacts
        restMesContactsMockMvc.perform(get("/api/mes-contacts/{id}", mesContacts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(mesContacts.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.fixe").value(DEFAULT_FIXE))
            .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE));
    }
    @Test
    @Transactional
    public void getNonExistingMesContacts() throws Exception {
        // Get the mesContacts
        restMesContactsMockMvc.perform(get("/api/mes-contacts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMesContacts() throws Exception {
        // Initialize the database
        mesContactsRepository.saveAndFlush(mesContacts);

        int databaseSizeBeforeUpdate = mesContactsRepository.findAll().size();

        // Update the mesContacts
        MesContacts updatedMesContacts = mesContactsRepository.findById(mesContacts.getId()).get();
        // Disconnect from session so that the updates on updatedMesContacts are not directly saved in db
        em.detach(updatedMesContacts);
        updatedMesContacts
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .email(UPDATED_EMAIL)
            .fixe(UPDATED_FIXE)
            .mobile(UPDATED_MOBILE);

        restMesContactsMockMvc.perform(put("/api/mes-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMesContacts)))
            .andExpect(status().isOk());

        // Validate the MesContacts in the database
        List<MesContacts> mesContactsList = mesContactsRepository.findAll();
        assertThat(mesContactsList).hasSize(databaseSizeBeforeUpdate);
        MesContacts testMesContacts = mesContactsList.get(mesContactsList.size() - 1);
        assertThat(testMesContacts.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testMesContacts.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testMesContacts.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testMesContacts.getFixe()).isEqualTo(UPDATED_FIXE);
        assertThat(testMesContacts.getMobile()).isEqualTo(UPDATED_MOBILE);
    }

    @Test
    @Transactional
    public void updateNonExistingMesContacts() throws Exception {
        int databaseSizeBeforeUpdate = mesContactsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMesContactsMockMvc.perform(put("/api/mes-contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mesContacts)))
            .andExpect(status().isBadRequest());

        // Validate the MesContacts in the database
        List<MesContacts> mesContactsList = mesContactsRepository.findAll();
        assertThat(mesContactsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMesContacts() throws Exception {
        // Initialize the database
        mesContactsRepository.saveAndFlush(mesContacts);

        int databaseSizeBeforeDelete = mesContactsRepository.findAll().size();

        // Delete the mesContacts
        restMesContactsMockMvc.perform(delete("/api/mes-contacts/{id}", mesContacts.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MesContacts> mesContactsList = mesContactsRepository.findAll();
        assertThat(mesContactsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
