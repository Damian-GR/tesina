import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  urlAutorizacion: string = 'https://example.com/api';

  bodyAutorizacion = {
    username: 'sebssblamer91@gmail.com',
    password: 's3FP5L2neXcSAN6w'
  };

  url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-razwv/endpoint/data/v1/action/findOne';
  

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  sendResponse(response: Response){
    this.http.post(this.urlAutorizacion, this.bodyAutorizacion, { headers: this.headers }).subscribe(
      (resp: any) => {
          var header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'Authorization': 'Bearer ' + resp.access_token
          });
        this.http.post(this.url, JSON.stringify(response), { headers: header }).subscribe(
          (resp2) => {
            Swal.fire({
              title: "Exito.",
              text: "Su respuesta fue guardada!",
              icon: "success"
            });
          },
          (error) => {
            Swal.fire({
              title: "Lo siento.",
              text: "Hubo un error al procesar su respuesta.",
              icon: "error"
            });
          }
        );
      },
      (error) => {
        Swal.fire({
          title: "Lo siento.",
          text: "Hubo un error al procesar su respuesta.",
          icon: "error"
        });
      }
    );
  }

}
