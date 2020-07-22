import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DevsecTestModule } from '../../../test.module';
import { OwaspCommentsUpdateComponent } from 'app/entities/owasp-comments/owasp-comments-update.component';
import { OwaspCommentsService } from 'app/entities/owasp-comments/owasp-comments.service';
import { OwaspComments } from 'app/shared/model/owasp-comments.model';

describe('Component Tests', () => {
  describe('OwaspComments Management Update Component', () => {
    let comp: OwaspCommentsUpdateComponent;
    let fixture: ComponentFixture<OwaspCommentsUpdateComponent>;
    let service: OwaspCommentsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevsecTestModule],
        declarations: [OwaspCommentsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OwaspCommentsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OwaspCommentsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OwaspCommentsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OwaspComments(123);
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
        const entity = new OwaspComments();
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
