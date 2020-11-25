import { LitElement, html} from 'lit-element';
import '../admin-lista-polls/admin-lista-polls.js';
import '../admin-add-poll/admin-add-poll.js';

class AdminMainAdminPoll extends LitElement {

    render(){
        return html`
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"  crossorigin="anonymous" />            
        <admin-lista-polls @admin-lista-polls-addform-event="${this.addPoll}"></admin-lista-polls>
        <admin-add-poll @admin-add-poll-back-event="${this.formPollBack}" class="d-none"></admin-add-poll>
        `;
    }

    addPoll(e){
        console.log("Añadimos un poll nuevo");

        this.shadowRoot.querySelector("admin-lista-polls").classList.add("d-none");
        this.shadowRoot.querySelector("admin-add-poll").classList.remove("d-none");
    }

    formPollBack(){
        console.log("formPollBack");

        this.shadowRoot.querySelector("admin-lista-polls").getPollsData();
        this.shadowRoot.querySelector("admin-lista-polls").classList.remove("d-none");
        this.shadowRoot.querySelector("admin-add-poll").classList.add("d-none");
    }   
}
 
customElements.define('admin-main-admin-poll', AdminMainAdminPoll);