import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevsecTestModule } from '../../../test.module';
import { OwaspCommentsComponent } from 'app/entities/owasp-comments/owasp-comments.component';
import { OwaspCommentsService } from 'app/entities/owasp-comments/owasp-comments.service';
import { OwaspComments } from 'app/shared/model/owasp-comments.model';

describe('Component Tests', () => {
  describe('OwaspComments Management Component', () => {
    let comp: OwaspCommentsComponent;
    let fixture: ComponentFixture<OwaspCommentsComponent>;
    let service: OwaspCommentsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevsecTestModule],
        declarations: [OwaspCommentsComponent],
      })
        .overrideTemplate(OwaspCommentsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OwaspCommentsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OwaspCommentsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OwaspComments(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.owaspComments && comp.owaspComments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
