import "../components/back-button.js";
import { importJS, importCSS } from "../helpers/importer.js";

export default async function(render) {
    render(`
        <div class="component_componentpage">
            <h1>
                <component-back></component-back>
                Components
            </h1>
            <p>
                loading the design system ...
            </p>
        </div>
   `);    

    // load the design system
    await importCSS("https://nordcdn.net/ds/css/3.1.0/nord.min.css");
    await importJS("https://nordcdn.net/ds/components/3.1.1/index.js", "module");

    render(`
        <div class="component_componentpage">
            <h1>
                <component-back></component-back>
                Components
            </h1>
            <p>

                <nord-card>
                  This is the <a href="https://nordhealth.design/">Nord design system</a>. There's many other design system to pick from if you want to get started quickly
                  <br/>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla provident aliquid corporis tempora eius quam, quae vel
                  molestias esse maxime aperiam totam suscipit. Nobis consectetur optio reprehenderit animi? Suscipit, quibusdam?
                </nord-card>

                <br/><br/>
                <nord-stack align-items="center" direction="horizontal" wrap>
                  <nord-avatar name="Laura Williams" size="s"></nord-avatar>
                  <nord-avatar name="Laura Williams" size="m"></nord-avatar>
                  <nord-avatar name="Laura Williams" size="l"></nord-avatar>
                  <nord-avatar name="Laura Williams" size="xl"></nord-avatar>
                  <nord-avatar name="Laura Williams" size="xxl"></nord-avatar>
                  <nord-avatar name="Laura Williams" size="xxxl"></nord-avatar>
                </nord-stack>

                <br/>
                <nord-stack gap="s">
                  <nord-badge>Neutral</nord-badge>
                  <nord-badge variant="danger">Danger</nord-badge>
                  <nord-badge variant="warning">Warning</nord-badge>
                  <nord-badge variant="success">Success</nord-badge>
                  <nord-badge variant="info">Info</nord-badge>
                  <nord-badge variant="highlight">Highlight</nord-badge>
                </nord-stack>

                <br/><br/>
                <nord-stack>
                  <nord-banner variant="info">
                    We’ve updated your plan, make sure you know how these changes affect it.
                    <a href="#">Learn more</a>.
                  </nord-banner>
                  <nord-banner variant="danger">
                    We’re experiencing an incident. Please see our <a href="#">status page</a> for more details.
                  </nord-banner>
                  <nord-banner variant="warning">
                    Payment details missing. To stay on your current plan, <a href="#">add payment details</a>.
                  </nord-banner>
                  <nord-banner variant="success">
                    Your order has been shipped and will arrive on May 27th. <a href="#">Track order</a>.
                  </nord-banner>
                </nord-stack>

                <br/><br/>
                <nord-stack gap="s" direction="horizontal" wrap>
                  <nord-button href="#">Default</nord-button>
                  <nord-button href="#" variant="primary">Primary</nord-button>
                  <nord-button href="#" variant="danger">Danger</nord-button>
                  <nord-button href="#" variant="dashed">
                    <nord-icon slot="start" name="interface-filter"></nord-icon>
                    Filter
                  </nord-button>
                  <nord-button href="#">
                    <nord-icon name="interface-menu-small" label="Options"></nord-icon>
                  </nord-button>
                  <nord-button href="#" variant="plain">Plain</nord-button>
                  <nord-button href="#" disabled>Disabled</nord-button>
                </nord-stack>

                <br/><br/>
                <nord-visually-hidden id="label">Send options</nord-visually-hidden>

                <br/><br/>
                <nord-button-group aria-labelledby="label">
                  <nord-button variant="primary">Send invoice</nord-button>
                  <nord-dropdown size="s" align="end">
                    <nord-button slot="toggle" variant="primary">
                      <nord-icon name="arrow-down-small"></nord-icon>
                    </nord-button>
                    <nord-dropdown-item>Send later today</nord-dropdown-item>
                    <nord-dropdown-item>Send tomorrow</nord-dropdown-item>
                    <nord-dropdown-item>Mark as paid</nord-dropdown-item>
                  </nord-dropdown>
                </nord-button-group>

                <br/><br/>
                <nord-calendar></nord-calendar>

                <br/><br/>
                <nord-stack direction="horizontal" justify-content="center" style="margin-bottom: calc(var(--n-space-xxl) * 3)">
                  <nord-dropdown size="s">
                    <nord-button slot="toggle">Menu</nord-button>
                    <nord-dropdown-item href="#">View profile</nord-dropdown-item>
                    <nord-dropdown-item>Settings</nord-dropdown-item>
                    <nord-dropdown-item>Show keyboard shortcuts</nord-dropdown-item>
                    <nord-dropdown-item>Help & Support</nord-dropdown-item>
                    <nord-dropdown-item>API</nord-dropdown-item>
                    <nord-dropdown-item>Sign out</nord-dropdown-item>
                  </nord-dropdown>
                </nord-stack>

                <br/><br/>
                <nord-fieldset label="Fieldset label">
                  <nord-stack>
                    <nord-checkbox name="option" value="1" label="Option 1"></nord-checkbox>
                    <nord-checkbox name="option" value="2" label="Option 2"></nord-checkbox>
                  </nord-stack>
                </nord-fieldset>

                <br/><br/>
                <nord-icon size="xxl" name="navigation-dashboard"></nord-icon>

                <br/><br/>
                <nord-input label="Label" value="Value"></nord-input>

                <br/><br/>
                <nord-message unread>
                  Ariel Salminen arrived to clinic with Pixie cat.
                  <span slot="footer">Just now at Nord Clinic</span>
                </nord-message>
                <nord-message unread>
                  Nina Hallikainen arrived to clinic with Durante dog.
                  <span slot="footer">20 minutes ago at Nord Clinic</span>
                </nord-message>
                <nord-message unread>
                  David Darnes arrived to clinic with Norfryd cat.
                  <span slot="footer">2 hours ago at Nord Clinic</span>
                </nord-message>

                <br/><br/>
                <nord-nav-group style="max-inline-size: 220px">
                  <nord-nav-item href="#" icon="navigation-search">Search</nord-nav-item>
                  <nord-nav-item href="#" icon="navigation-notifications">Notifications</nord-nav-item>
                  <nord-nav-item href="#" icon="navigation-tasks">My tasks</nord-nav-item>
                </nord-nav-group>

                <br/><br/>
                <nord-navigation style="max-inline-size: 250px">
                  <nord-dropdown slot="header" expand>
                    <nord-button slot="toggle" expand>
                      <nord-avatar slot="start" variant="square">B</nord-avatar>
                      Bath Clinic
                    </nord-button>
                    <nord-dropdown-group heading="laura.williams@nordhealth.com">
                      <nord-dropdown-item>
                        <nord-avatar slot="start" size="s" variant="square">B</nord-avatar>
                        Bath Clinic
                        <nord-icon slot="end" name="interface-checked"></nord-icon>
                      </nord-dropdown-item>
                      <nord-dropdown-item>
                        <nord-avatar slot="start" size="s" variant="square" style="--n-avatar-color: var(--n-color-status-success)">
                          O
                        </nord-avatar>
                        Ocean Beach Clinic
                      </nord-dropdown-item>
                    </nord-dropdown-group>
                    <nord-dropdown-group>
                      <nord-dropdown-item>Add another clinic</nord-dropdown-item>
                      <nord-dropdown-item>Customize style</nord-dropdown-item>
                    </nord-dropdown-group>
                    <nord-dropdown-item>Sign out from all clinics</nord-dropdown-item>
                  </nord-dropdown>
                  <nord-nav-group heading="Workspace">
                    <nord-nav-item active icon="navigation-dashboard">Dashboard</nord-nav-item>
                    <nord-nav-item icon="navigation-payments">Payments</nord-nav-item>
                    <nord-nav-item icon="navigation-reports">Reports</nord-nav-item>
                    <nord-nav-item icon="navigation-settings">Settings</nord-nav-item>
                  </nord-nav-group>
                </nord-navigation>

                <br/><br/>
                <nord-progress-bar value="40"></nord-progress-bar>

                <br/><br/>
                <nord-stack>
                  <nord-qrcode value="https://nordhealth.design"></nord-qrcode>
                  <nord-input value="https://nordhealth.design" label="Value"></nord-input>
                </nord-stack>

                <script>
                  const qrCode = document.querySelector("nord-qrcode")
                  const input = document.querySelector("nord-input")

                  input.addEventListener("input", () => (qrCode.value = input.value))
                </script>

                <br/><br/>
                <nord-textarea label="Label" value="Value"></nord-textarea>

                <br/><br/>
                <nord-fieldset label="Radios">
                  <nord-stack direction="vertical">
                    <nord-radio label="Option 1" name="test" value="1"></nord-radio>
                    <nord-radio label="Option 2" name="test" value="2"></nord-radio>
                  </nord-stack>
                </nord-fieldset>

                <br/><br/>
                <nord-range label="Label" value="7" min="0" max="10"></nord-range>

                <br/><br/>
                <nord-select name="page-size" value="25" label="Label">
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                  <option value="100">100 per page</option>
                </nord-select>

                <br/><br/>
                <nord-spinner size="xl"></nord-spinner>

                <br/><br/>
                <nord-tab-group label="Tabs">
                  <nord-tab slot="tab">Profile</nord-tab>
                  <nord-tab slot="tab" selected>Settings</nord-tab>
                </nord-tab-group>

                <br/><br/>
                <nord-stack>
                  <nord-toggle checked label="Checked toggle" value="Value"></nord-toggle>
                  <nord-toggle label="Unchecked" value="Value"></nord-toggle>
                </nord-stack>
            </p>
        </div>
   `);
};
