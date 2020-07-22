package org.owasp.psafix.devsec.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.owasp.psafix.devsec.web.rest.TestUtil;

public class OwaspCommentsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OwaspComments.class);
        OwaspComments owaspComments1 = new OwaspComments();
        owaspComments1.setId(1L);
        OwaspComments owaspComments2 = new OwaspComments();
        owaspComments2.setId(owaspComments1.getId());
        assertThat(owaspComments1).isEqualTo(owaspComments2);
        owaspComments2.setId(2L);
        assertThat(owaspComments1).isNotEqualTo(owaspComments2);
        owaspComments1.setId(null);
        assertThat(owaspComments1).isNotEqualTo(owaspComments2);
    }
}
