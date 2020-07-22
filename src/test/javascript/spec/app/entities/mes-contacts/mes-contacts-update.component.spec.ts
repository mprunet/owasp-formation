import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DevsecTestModule } from '../../../test.module';
import { MesContactsUpdateComponent } from 'app/entities/mes-contacts/mes-contacts-update.component';
import { MesContactsService } from 'app/entities/mes-contacts/mes-contacts.service';
import { MesContacts } from 'app/shared/model/mes-contacts.model';

describe('Component Tests', () => {
  describe('MesContacts Management Update Component', () => {
    let comp: MesContactsUpdateComponent;
    let fixture: ComponentFixture<MesContactsUpdateComponent>;
    let service: MesContactsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevsecTestModule],
        declarations: [MesContactsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MesContactsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MesContactsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MesContactsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MesContacts(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MesContacts();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
