import { log } from "console";
import { fetchDOM } from "./src/get-dom";
import { EventGame, Ticket } from "./src/models/event.model";
import { table, TableUserConfig } from 'table';
import { fetchTickets } from "./src/fetch";

(async () => {
    const tickets = await fetchTickets()
    console.log(tickets[0].games![6]);
    
})();
