import { TestBed } from '@angular/core/testing';

import { Contact.ResolverService } from './contact.resolver.service';

describe('Contact.ResolverService', () => {
  let service: Contact.ResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contact.ResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
