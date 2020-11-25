import { LitElement, html} from 'lit-element';

class AdminHeader extends LitElement {
    render(){
        return html`
            <h1>Administración de Feedbacks</h1>
        `;
    }
}

customElements.define('admin-header', AdminHeader);