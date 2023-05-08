import axios, { AxiosError } from 'axios'
import { EventGame, Ticket } from './models/event.model';
import { fetchDOM } from './get-dom';
import { log } from 'console';

export async function fetchTickets(): Promise<Ticket[] | []> {
    const dom = await fetchDOM();
    const gamesHtml = dom.getElementsByClassName('event-name');
    const ticketsHtml = dom.getElementsByClassName('bet-activity-card'); //bet-activity-card //bet-label__amount
    const selectionsHtml = dom.getElementsByClassName('selection-label');
    const gamesHTML = dom.getElementsByClassName('leg-info leg-info--divider-visible');
    
    log(`Number of tests:`, gamesHTML.length)
    log(`Number of selections:`, selectionsHtml.length)
    log(`Number of tickets:`, ticketsHtml.length)
    log(`Number of games:`, gamesHtml.length)
    let tickets = new Array<Ticket>;
    let games = new Array<EventGame>;

    for (let game of gamesHTML) {
        let selectionsOfGame:string[] = []
        let selectionElements = game.getElementsByClassName('selection-label')
        let eventName = game.getElementsByClassName('event-name')[0].innerHTML
        let eventGame: EventGame = { eventName } 
        for(let selection of selectionElements) {
            selectionsOfGame.push(selection.innerHTML.replace(/\s/g, ''));
        }
        eventGame.selectionLabels = selectionsOfGame
        games.push(eventGame);
    }

    let beginIndex = 0
    for (let ticketHtml of ticketsHtml) {
        let amountElement = ticketHtml.getElementsByClassName('bet-label__amount');
        let numberOfGamesElement = ticketHtml.getElementsByClassName('bet-label__title tw-truncate');
        const numberOfGames = Number(numberOfGamesElement[0].innerHTML.match(/"([^-]*)-/)![1])
        const value = parseFloat(amountElement[0].innerHTML.match(/\$.*/)![0].substring(1).replace(/,/g, '.'));
        let gamesOfTicket:Array<EventGame> = games.slice(beginIndex, beginIndex + numberOfGames)
        let ticket: Ticket = {
            amount: value,
            games:gamesOfTicket
        }

        tickets.push(ticket)
        beginIndex  += numberOfGames
    }

    return tickets;
}