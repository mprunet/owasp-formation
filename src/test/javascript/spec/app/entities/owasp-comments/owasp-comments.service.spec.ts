import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { OwaspCommentsService } from 'app/entities/owasp-comments/owasp-comments.service';
import { IOwaspComments, OwaspComments } from 'app/shared/model/owasp-comments.model';

describe('Service Tests', () => {
  describe('OwaspComments Service', () => {
    let injector: TestBed;
    let service: OwaspCommentsService;
    let httpMock: HttpTestingController;
    let elemDefault: IOwaspComments;
    let expectedResult: IOwaspComments | IOwaspComments[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OwaspCommentsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new OwaspComments(0, currentDate, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            commentDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a OwaspComments', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            commentDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            commentDate: currentDate,
          },
          returnedFromService
        );

        service.create(new OwaspComments()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a OwaspComments', () => {
        const returnedFromService = Object.assign(
          {
            commentDate: currentDate.format(DATE_FORMAT),
            comment: 'BBBBBB',
            author: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            commentDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of OwaspComments', () => {
        const returnedFromService = Object.assign(
          {
            commentDate: currentDate.format(DATE_FORMAT),
            comment: 'BBBBBB',
            author: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            commentDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a OwaspComments', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
