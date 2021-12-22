import { map, catchError, finalize } from 'rxjs/operators';
import { VendorData, VendorService } from './../../services/vendor.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Vendor } from '../../models/Vendor';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Config } from 'src/app/models/Config';
import { of } from 'rxjs';
// declare const $: Function;
@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
})
export class VendorsComponent implements OnInit, AfterViewInit {
  ELEMENT_DATA: Vendor[] = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];
  displayedColumns: string[] = [
    'Vendor Code',
    'Name',
    'Address',
    'Fax',
    'Tel',
    'PND',
    'Tax ID',
    'VAT Register No',
    'TaxId Vendor1',
    'TaxId Vendor2',
    'TaxId Vendor3',
  ];
  dataSource: MatTableDataSource<Vendor> = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private vendorService: VendorService) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    // console.log(typeof this.dataTable);
    // $(this.dataTable.nativeElement).DataTable();
  }

  ngOnInit(): void {
    this.getVendors();
  }

  getVendors(): void {
    console.log(this.dataSource);

    this.vendorService
      .getVendors()
      .subscribe((data) => (this.dataSource.data = data.item));
  }

  pageChanged(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;
    this.vendorService
      .getVendors()
      .subscribe((data: Config) => (this.dataSource.data = data.item));
  }

  showRow(row: any) {
    alert(JSON.stringify(row));
  }
}
