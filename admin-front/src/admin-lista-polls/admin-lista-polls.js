import { LitElement, html} from 'lit-element';
import '../admin-lista-feeds/admin-lista-feeds.js';

class AdminListaPolls extends LitElement {

static get properties(){
    return {
        polls: {type:Array}    };
}

    constructor(){
        super();

        this.polls = [];
        this.getPollsData();
        this.myBool = false;
    }

    render(){

        return html`
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"  crossorigin="anonymous" />
        <style>
            .nowr {
                display:inline;
            }
            .nowr2 {
                white-space: nowrap;
                overflow: hidden;
            }
        </style>
        <h5 class="nowr" >Lista de Encuestas</h5>
        &nbsp;&nbsp;&nbsp;
        <a @click="${this.addPoll}" class="btn btn-sm btn-outline-secondary"><strong>Añadir encuesta</strong></a>
        </br>
        </br>
        <div class="table-responsive">
            <table class="table table-striped table-sm" style="width:1%" >
                <caption class="nowr2">Numero de encuestas: <span class="badge badge-secondary">${this.polls.length}</span></caption>

                ${this.myBool ?
                    html`
                    <thead>                                      
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">URL</th>
                            <th scope="col"<&nbsp;</th>
                            <th scope="col">Ver</th>
                            <th scope="col">Borrar</th>
                        </tr>
                    </thead>
                    ` : html``
                }

                <tbody>
                ${this.polls.map(
                    poll => html`
                    <tr>
                        <td >${poll.pollName}</td>
                        <td >${this.tipoPoll(poll.anon)}</td>
                        <td style="width:1%" nowrap>${urlFront}/feedback/${poll.anon}/${poll.id}
                        </td>
                        <td>
                            <a @click="${this.textToClipboard}" id="${urlFront}/feedback/${poll.anon}/${poll.id}" class="btn"><img src="./imgs/clippy.svg" id="${urlFront}/feedback/${poll.anon}/${poll.id}" alt="eliminar" height="20" width="20"></a>
                        </td>
                        <td >                          
                            <a @click="${this.getFeeds}" name="${poll.pollName}" id="${poll.id}" class="btn" ><img name="${poll.pollName}" src="./imgs/detail.png" id="${poll.id}" alt="eliminar" height="20" width="20"></a>
                        </td>
                        <td >                          
                            <a @click="${this.deletePoll}" id="${poll.id}" class="btn"><img src="./imgs/delete.png" id="${poll.id}" alt="eliminar" height="20" width="20"></a>
                        </td>                        
                    </tr>
                    `
                )}
                </tbody>
            </table>
        </div>
 
        <admin-lista-feeds titulo="Lista de feedbacks" class="d-none"></admin-lista-feeds>

        `;
    }

    addPoll(){
        this.dispatchEvent(new CustomEvent("admin-lista-polls-addform-event",{}));
    }
    

    getPollsData(){
        console.log("getPollsData");
        console.log("Obteniendo datos de las encuestas");

        let xhr = new XMLHttpRequest();

        xhr.onload = () => {
            console.log("Estado peticion: "+ xhr.status);
            if(xhr.status === 200){
                let apiResponse = JSON.parse(xhr.responseText);
                this.polls=apiResponse;

                if (this.polls.length > 0){
                    this.myBool = true;
                } else {
                    this.myBool = false;
                }                
            }
        }

        xhr.open("GET", urlBack + "/feedback/v1/polls", true);
        xhr.send();

        if(xhr.status != 200){
             this.getPollsMock();
        }
    }

    getPollsMock(){
        console.log("getPollsMock");
        this.polls = [
            {
                id: "12345",
                pollName: "poll1",
                anon: "a"                
            },
            {
                id: "23456",
                pollName: "poll2",
                anon: "r"
            }
        ];
    }

    tipoPoll(anon){

        if(anon=='r'){
            return 'usuario';
        }
        return 'anónima';
    }

    getFeeds(e){

        let idPoll=e.target.id;
        console.log("vemos el contenido del poll " + idPoll);

        let pollName = e.target.name;
         let xhr = new XMLHttpRequest();

        xhr.onload = () => {
            console.log("Estado peticion: "+ xhr.status);
            if(xhr.status === 200){
                console.log("obtenidos feeds del ID " + idPoll);
                let apiResponse = JSON.parse(xhr.responseText);
                this.shadowRoot.querySelector("admin-lista-feeds").feeds=apiResponse;
            }
        }

        console.log(urlBack + "/feedback/v1/feeds/"+idPoll);
        xhr.open("GET", urlBack + "/feedback/v1/feeds/"+idPoll, true);
        xhr.send();

        if(xhr.status != 200){
            console.log("Obteniendo feeds del ID " + idPoll + " (MOCK)");
        }

        this.shadowRoot.querySelector("admin-lista-feeds").classList.remove("d-none");
        this.shadowRoot.querySelector("admin-lista-feeds").titulo = pollName;
    } 

    textToClipboard(e){

        console.log("textToClipboard");
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = e.target.id;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);  
    }

    deletePoll(e){

        let confirma = window.confirm("¿Eliminar la encuesta y todos sus feedbacks?");
        let idPoll=e.target.id;
        let xhr = new XMLHttpRequest();       
       
        if (confirma){
            console.log("borrando encuesta: " + idPoll);

            xhr.onload = () => {
                console.log("Estado peticion: "+ xhr.status);
                if(xhr.status === 200){
                    console.log("Borrado el ID " + idPoll);
                    this.shadowRoot.querySelector("admin-lista-feeds").classList.add("d-none");
                    this.getPollsData();                    
                }
            }
    
            xhr.open("DELETE", urlBack + "/feedback/v1/polls/"+idPoll, true);
            xhr.send();
    
            if(xhr.status != 200){
                console.log("Borrado el ID " + idPoll + " (MOCK)");
            } 
        }
    }
    
}

customElements.define('admin-lista-polls', AdminListaPolls);
