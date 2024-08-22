import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAccessComponent } from './file-access.component';

describe('FileAccessComponent', () => {
  let component: FileAccessComponent;
  let fixture: ComponentFixture<FileAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
