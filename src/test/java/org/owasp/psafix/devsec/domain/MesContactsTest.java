package org.owasp.psafix.devsec.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.owasp.psafix.devsec.web.rest.TestUtil;

public class MesContactsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MesContacts.class);
        MesContacts mesContacts1 = new MesContacts();
        mesContacts1.setId(1L);
        MesContacts mesContacts2 = new MesContacts();
        mesContacts2.setId(mesContacts1.getId());
        assertThat(mesContacts1).isEqualTo(mesContacts2);
        mesContacts2.setId(2L);
        assertThat(mesContacts1).isNotEqualTo(mesContacts2);
        mesContacts1.setId(null);
        assertThat(mesContacts1).isNotEqualTo(mesContacts2);
    }
}
