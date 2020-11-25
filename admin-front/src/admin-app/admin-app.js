import { LitElement, html} from 'lit-element';
import '../admin-header/admin-header.js';
import '../admin-main-admin-poll/admin-main-admin-poll.js';
import '../admin-footer/admin-footer.js';

class AdminApp extends LitElement {

    constructor(){
        super();
    }

    render(){
        return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"  crossorigin="anonymous" />
            <main role="main" class="col-md-9 ml-sm-auto col-lg-12 pt-3 px-4">
                <admin-header></admin-header>
                <div>
                    <admin-main-admin-poll></admin-main-admin-poll>
                </div>
                <admin-footer></admin-footer>
            </main>
        `;
    }
}

customElements.define('admin-app', AdminApp);