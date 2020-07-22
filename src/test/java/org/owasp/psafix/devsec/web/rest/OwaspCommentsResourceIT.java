package org.owasp.psafix.devsec.web.rest;

import org.owasp.psafix.devsec.DevsecApp;
import org.owasp.psafix.devsec.domain.OwaspComments;
import org.owasp.psafix.devsec.repository.OwaspCommentsRepository;
import org.owasp.psafix.devsec.service.OwaspCommentsService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OwaspCommentsResource} REST controller.
 */
@SpringBootTest(classes = DevsecApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class OwaspCommentsResourceIT {

    private static final LocalDate DEFAULT_COMMENT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_COMMENT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    @Autowired
    private OwaspCommentsRepository owaspCommentsRepository;

    @Autowired
    private OwaspCommentsService owaspCommentsService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOwaspCommentsMockMvc;

    private OwaspComments owaspComments;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OwaspComments createEntity(EntityManager em) {
        OwaspComments owaspComments = new OwaspComments()
            .commentDate(DEFAULT_COMMENT_DATE)
            .comment(DEFAULT_COMMENT)
            .author(DEFAULT_AUTHOR);
        return owaspComments;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OwaspComments createUpdatedEntity(EntityManager em) {
        OwaspComments owaspComments = new OwaspComments()
            .commentDate(UPDATED_COMMENT_DATE)
            .comment(UPDATED_COMMENT)
            .author(UPDATED_AUTHOR);
        return owaspComments;
    }

    @BeforeEach
    public void initTest() {
        owaspComments = createEntity(em);
    }

    @Test
    @Transactional
    public void createOwaspComments() throws Exception {
        int databaseSizeBeforeCreate = owaspCommentsRepository.findAll().size();
        // Create the OwaspComments
        restOwaspCommentsMockMvc.perform(post("/api/owasp-comments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(owaspComments)))
            .andExpect(status().isCreated());

        // Validate the OwaspComments in the database
        List<OwaspComments> owaspCommentsList = owaspCommentsRepository.findAll();
        assertThat(owaspCommentsList).hasSize(databaseSizeBeforeCreate + 1);
        OwaspComments testOwaspComments = owaspCommentsList.get(owaspCommentsList.size() - 1);
        assertThat(testOwaspComments.getCommentDate()).isEqualTo(DEFAULT_COMMENT_DATE);
        assertThat(testOwaspComments.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testOwaspComments.getAuthor()).isEqualTo(DEFAULT_AUTHOR);
    }

    @Test
    @Transactional
    public void createOwaspCommentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = owaspCommentsRepository.findAll().size();

        // Create the OwaspComments with an existing ID
        owaspComments.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOwaspCommentsMockMvc.perform(post("/api/owasp-comments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(owaspComments)))
            .andExpect(status().isBadRequest());

        // Validate the OwaspComments in the database
        List<OwaspComments> owaspCommentsList = owaspCommentsRepository.findAll();
        assertThat(owaspCommentsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOwaspComments() throws Exception {
        // Initialize the database
        owaspCommentsRepository.saveAndFlush(owaspComments);

        // Get all the owaspCommentsList
        restOwaspCommentsMockMvc.perform(get("/api/owasp-comments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(owaspComments.getId().intValue())))
            .andExpect(jsonPath("$.[*].commentDate").value(hasItem(DEFAULT_COMMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR)));
    }
    
    @Test
    @Transactional
    public void getOwaspComments() throws Exception {
        // Initialize the database
        owaspCommentsRepository.saveAndFlush(owaspComments);

        // Get the owaspComments
        restOwaspCommentsMockMvc.perform(get("/api/owasp-comments/{id}", owaspComments.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(owaspComments.getId().intValue()))
            .andExpect(jsonPath("$.commentDate").value(DEFAULT_COMMENT_DATE.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR));
    }
    @Test
    @Transactional
    public void getNonExistingOwaspComments() throws Exception {
        // Get the owaspComments
        restOwaspCommentsMockMvc.perform(get("/api/owasp-comments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOwaspComments() throws Exception {
        // Initialize the database
        owaspCommentsService.save(owaspComments);

        int databaseSizeBeforeUpdate = owaspCommentsRepository.findAll().size();

        // Update the owaspComments
        OwaspComments updatedOwaspComments = owaspCommentsRepository.findById(owaspComments.getId()).get();
        // Disconnect from session so that the updates on updatedOwaspComments are not directly saved in db
        em.detach(updatedOwaspComments);
        updatedOwaspComments
            .commentDate(UPDATED_COMMENT_DATE)
            .comment(UPDATED_COMMENT)
            .author(UPDATED_AUTHOR);

        restOwaspCommentsMockMvc.perform(put("/api/owasp-comments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOwaspComments)))
            .andExpect(status().isOk());

        // Validate the OwaspComments in the database
        List<OwaspComments> owaspCommentsList = owaspCommentsRepository.findAll();
        assertThat(owaspCommentsList).hasSize(databaseSizeBeforeUpdate);
        OwaspComments testOwaspComments = owaspCommentsList.get(owaspCommentsList.size() - 1);
        assertThat(testOwaspComments.getCommentDate()).isEqualTo(UPDATED_COMMENT_DATE);
        assertThat(testOwaspComments.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testOwaspComments.getAuthor()).isEqualTo(UPDATED_AUTHOR);
    }

    @Test
    @Transactional
    public void updateNonExistingOwaspComments() throws Exception {
        int databaseSizeBeforeUpdate = owaspCommentsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOwaspCommentsMockMvc.perform(put("/api/owasp-comments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(owaspComments)))
            .andExpect(status().isBadRequest());

        // Validate the OwaspComments in the database
        List<OwaspComments> owaspCommentsList = owaspCommentsRepository.findAll();
        assertThat(owaspCommentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOwaspComments() throws Exception {
        // Initialize the database
        owaspCommentsService.save(owaspComments);

        int databaseSizeBeforeDelete = owaspCommentsRepository.findAll().size();

        // Delete the owaspComments
        restOwaspCommentsMockMvc.perform(delete("/api/owasp-comments/{id}", owaspComments.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OwaspComments> owaspCommentsList = owaspCommentsRepository.findAll();
        assertThat(owaspCommentsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
