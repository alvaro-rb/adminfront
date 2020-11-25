import { LitElement, html} from 'lit-element';

class AdminFooter extends LitElement {
    render(){
        return html`
            <h5>(c)Hackathon noviembre 2020</h5>
        `;
    }
}

customElements.define('admin-footer', AdminFooter);