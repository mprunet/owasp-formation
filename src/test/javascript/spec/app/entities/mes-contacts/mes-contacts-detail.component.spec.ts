import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevsecTestModule } from '../../../test.module';
import { MesContactsDetailComponent } from 'app/entities/mes-contacts/mes-contacts-detail.component';
import { MesContacts } from 'app/shared/model/mes-contacts.model';

describe('Component Tests', () => {
  describe('MesContacts Management Detail Component', () => {
    let comp: MesContactsDetailComponent;
    let fixture: ComponentFixture<MesContactsDetailComponent>;
    const route = ({ data: of({ mesContacts: new MesContacts(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevsecTestModule],
        declarations: [MesContactsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MesContactsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MesContactsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load mesContacts on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mesContacts).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
