import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import ApiService = require("../../../shared/services/api.service");

import {ITicket} from './ticket';

@Injectable()
export class TicketService { 

    private deleteUrl:string = ApiService.serverUrl + '/restful/ticket';
    private postUrl:string = ApiService.serverUrl + '/restful/ticket';
    private putUrl:string = ApiService.serverUrl + '/restful/ticket/';
    private getUrl:string = ApiService.serverUrl + '/restful/ticket/';
    private getOneUrl:string = ApiService.serverUrl + '/restful/ticket/';


    constructor(private http: Http) { }

    getAllTicket(): Promise<ITicket[]> {
        console.log("service GetAllTickets");        
        return this.http.get(this.getUrl)
                 .toPromise()
                 .then(res => res.json())
                 .catch(this.handleError);
                }

     getTicketbyId(ticketId:number):Promise<ITicket[]> {
        console.log("service Get one ticket with id "+ ticketId);        
        let url = `${this.getOneUrl}/${ticketId}`;
        return this.http.get(url)
                 .toPromise()
                 .then(res => res.json())
                 .catch(this.handleError);
                }           

    addTicket(ticket:ITicket): Promise<ITicket> {
return this.http.post(this.postUrl, JSON.stringify(ticket))
                        .toPromise()
                        .then(res => res.json())
                        .catch(this.handleError);
    }

    editTicket(ticket:ITicket):Promise<ITicket>  {
     
        console.log("TicketService.editTicket(ticket) ===> [id:" + ticket.ticketId + "  name:" + ticket.name +
        "   description:" + ticket.description + " state:"+ ticket.state +  "  time:"+ticket.time+"]");
        return this.http.put(this.putUrl, JSON.stringify(ticket))
                        .toPromise()
                        .then(res => res.json())
                        .catch(this.handleError);
    }

    deleteTicket(ticket:ITicket): Promise<ITicket> {
        let url = `${this.deleteUrl}/${ticket.ticketId}`;
        return this.http.delete(url)
                    .toPromise()
                    .then(res => ticket)
                    .catch(this.handleError);
        
    }

    private handleError(error: any):Promise<any> {
        console.log('HandleError', error);
        return Promise.reject(error.message || error);
    }


}