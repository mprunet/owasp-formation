import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevsecTestModule } from '../../../test.module';
import { OwaspCommentsDetailComponent } from 'app/entities/owasp-comments/owasp-comments-detail.component';
import { OwaspComments } from 'app/shared/model/owasp-comments.model';

describe('Component Tests', () => {
  describe('OwaspComments Management Detail Component', () => {
    let comp: OwaspCommentsDetailComponent;
    let fixture: ComponentFixture<OwaspCommentsDetailComponent>;
    const route = ({ data: of({ owaspComments: new OwaspComments(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevsecTestModule],
        declarations: [OwaspCommentsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OwaspCommentsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OwaspCommentsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load owaspComments on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.owaspComments).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
