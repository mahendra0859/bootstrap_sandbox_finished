import { Component, OnInit, ElementRef,NgZone,ViewChild, } from '@angular/core';
import { AuthService } from '../../app/service/auth.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
user = [];
locations = [];
markers: any = [];
showMarkers = false;
count : Number;
public searchControl: FormControl;

@ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private authService:AuthService,
    private router:Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
this.authService.getlistOfMerchant().subscribe(merchants =>{
  console.log(merchants.result);
  this.user=  merchants.result;
  console.log(this.user);
  const serviceArr: any = [];
  for (let index = 0; index < this.user.length; index++) {
    // console.log(this.user[index].name);
    // name=this.user[index].name    
    serviceArr.push(this.authService.getlistofLcation(this.user[index].name));
    // this.authService.getlistofLcation(this.user[index].name).subscribe(merchantLocation =>{
    //   console.log("merchant result",merchantLocation.result);       
            
    // },
    // err =>{
    //   console.log(err);
    //   return false;
    // })
  }
  forkJoin(serviceArr).subscribe((response: any) => {
    if (response && response.length) {
      console.log(response);
      this.count = response.length;
      for (let index = 0; index < response.length; index++) {
        this.locations[index] = response[index].result[0];
      }
      this.markers = new Markers({location: this.locations}).locations;
      this.showMarkers = true;
      console.log(this.markers)
    }
  })
  console.log("locations details",this.locations);
},
err =>{
  console.log(err);
  return false;
}) 

// this.authService.getlistofLcation(this.user[0].name).subscribe(merchantLocation =>{
//   console.log(merchantLocation.result);

// },
// err =>{
//   console.log(err);
//   return false;
// })
  
  }
  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 12.917654;
  lng: number = 77.623342;
  

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: any) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }
  
  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }
  
  // markers: marker[] = [
	//   {
	// 	  lat: 51.673858,
	// 	  lng: 7.815982,
	// 	  label: 'A',
	// 	  draggable: true
	//   },
	//   {
	// 	  lat: 51.373858,
	// 	  lng: 7.215982,
	// 	  label: 'B',
	// 	  draggable: false
	//   },
	//   {
	// 	  lat: 51.723858,
	// 	  lng: 7.895982,
	// 	  label: 'C',
	// 	  draggable: true
	//   }
  // ]


}
// just an interface for type safety.
export class Markers {
  locations: any = [];
  constructor(data) {
    if (data.location && data.location.length) {
      for (const item of data.location) {
        this.locations.push(
          {
            lat: item.lat,
            lng: item.long,
            label: item.locationName,
            draggable: false,
            email_id : item.locationEmail,
            phone_no : item.locationPhno,
            industry : item.locationIndustry
          }
        );
      }
    }
  }
}