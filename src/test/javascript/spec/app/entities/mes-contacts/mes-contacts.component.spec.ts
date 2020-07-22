import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevsecTestModule } from '../../../test.module';
import { MesContactsComponent } from 'app/entities/mes-contacts/mes-contacts.component';
import { MesContactsService } from 'app/entities/mes-contacts/mes-contacts.service';
import { MesContacts } from 'app/shared/model/mes-contacts.model';

describe('Component Tests', () => {
  describe('MesContacts Management Component', () => {
    let comp: MesContactsComponent;
    let fixture: ComponentFixture<MesContactsComponent>;
    let service: MesContactsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevsecTestModule],
        declarations: [MesContactsComponent],
      })
        .overrideTemplate(MesContactsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MesContactsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MesContactsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MesContacts(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mesContacts && comp.mesContacts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
