import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudTiempoUsoComponent } from './crud-tiempo-uso.component';

describe('CrudTiempoUsoComponent', () => {
  let component: CrudTiempoUsoComponent;
  let fixture: ComponentFixture<CrudTiempoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudTiempoUsoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudTiempoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
