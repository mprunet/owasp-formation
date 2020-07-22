package org.owasp.psafix.devsec;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("org.owasp.psafix.devsec");

        noClasses()
            .that()
                .resideInAnyPackage("org.owasp.psafix.devsec.service..")
            .or()
                .resideInAnyPackage("org.owasp.psafix.devsec.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..org.owasp.psafix.devsec.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
