import { LitElement, html} from 'lit-element';

class AdminListaFeeds extends LitElement {

    static get properties(){
        return {
            feeds: {type:Array},
            titulo: {type:String}
        };
    }

    constructor(){
        super();
        this.feeds = [];
    }

    render(){

        console.log("en el render de feeds");

        this.cuenta();

        return html`
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"  crossorigin="anonymous" />
        <h5>Feedbacks de la encuesta ${this.titulo}</h5>
        </br>
        <table class="table table-striped table-sm" style="width:50%" >
            <tr>
                <td nowrap>Positivos: <span class="badge badge-success">&nbsp;${this.positivo}&nbsp;</span></td>
                <td nowrap>Neutros: <span class=" badge badge-warning">&nbsp;${this.neutral}&nbsp;</span></td>
                <td nowrap>Negativos: <span class=" badge badge-danger">&nbsp;${this.negativo}&nbsp;</span></td>
                <td nowrap>Total fedbacks: <span class="badge badge-secondary">&nbsp;${this.feeds.length}&nbsp;</td></caption>
            </tr>
        </table>
        
        </br>  
                
        <div class="table-responsive">
            <table class="table table-striped table-sm" style="width:1%" >
                <thead>
                <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Valoracion</th>
                </tr>
                </thead>
                <tbody>
                ${this.feeds.map(
                    feed => html`
                    <tr>
                        <td nowrap>${feed.userName}</td>
                        <td nowrap align="center">${feed.valoracion}</td>
                    </tr>
                    `
                )}
                </tbody>
            </table>
        </div>
        `;
    }

    cuenta(){

        console.log("en cuenta");
        var i;
        this.positivo = 0;
        this.neutral = 0;
        this.negativo = 0;

        for (i = 0; i < this.feeds.length; ++i) {
            if (this.feeds[i].valoracion === "+1"){
                ++this.positivo;
            } else {
                if (this.feeds[i].valoracion === "-1"){
                    ++this.negativo;
                }  else{
                    ++this.neutral;
                }
            }
        }
    }   

}
customElements.define('admin-lista-feeds', AdminListaFeeds);
