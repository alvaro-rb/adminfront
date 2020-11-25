import { LitElement, html} from 'lit-element';

class AdminAddPoll extends LitElement {

   static get properties(){
        return {
            poll: {type: Object}
        }
    }

    constructor(){
        super();
        console.log("Contructor form");
        this.initFormData();
    }

    render(){
        return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"  crossorigin="anonymous" />
            <div>
                <form>
                    <div class="form-group">
                        <label>Nombre</label>
                        <input type="text" size="50" @input="${this.updatePollName}" id="pollName" class="form-control col-md-6" />
                    </div>
                    <div class="form-group">
                        <label>Tipo</label>
                        <select id="anon" @input="${this.updateAnon}" >
                            <option value="r" selected="selected">usuario</option>
                            <option value="a">anónimo</option>
                        </select>
                    </div>                    
                    <button @click="${this.goBack}" class="btn btn-sm btn-outline-secondary"><strong>Cancelar</strong></button>
                    <button @click="${this.storePoll}" class="btn btn-sm btn-outline-dark"><strong>Guardar</strong></button>
                </form>
            </div>
        `;
    }

    initFormData(){
        console.log("initFormData");

        this.poll = {};
        this.poll.pollName = "";
        this.poll.anon = "r";
    }

    goBack(e){
        console.log("goBack");
        e.preventDefault();

        this.initFormData();
        this.shadowRoot.querySelectorAll('#pollName')[0].value = ""; 
        this.shadowRoot.querySelectorAll('#anon')[0].selectedIndex = 0;
        this.dispatchEvent(new CustomEvent("admin-add-poll-back-event",{}));
    } 
    
    updatePollName(e){
        console.log("updatePollName");
        console.log("Actualizando la propiedad pollName con el valor "+ e.target.value);
        this.poll.pollName=e.target.value;
    }

    updateAnon(e){
        console.log("updateAnon");
        console.log("Actualizando la propiedad anon con el valor "+ e.target.value);
        this.poll.anon=e.target.value;
    } 
    
    storePoll(e){
        console.log("storePoll");
        e.preventDefault();

       let xhr = new XMLHttpRequest();

        xhr.onload = () => {
            console.log("Estado peticion: "+ xhr.status);
            if(xhr.status === 200){
                console.log("Se ha añadido una nueva encuesta");
            }else{
                console.log("Se ha añadido una nueva encuesta (MOCK)");
            }
            this.initFormData();
            this.shadowRoot.querySelectorAll('#pollName')[0].value = ""; 
            this.shadowRoot.querySelectorAll('#anon')[0].selectedIndex = 0;
            this.dispatchEvent(new CustomEvent("admin-add-poll-back-event",{}));
        }

        xhr.open("POST", urlBack + "/feedback/v1/polls", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(this.poll));
    }    
}

customElements.define('admin-add-poll', AdminAddPoll);
