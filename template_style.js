module.exports = `
 <head>
    <title>Report</title>
    <link
      rel="stylesheet"
      href="./assets/css/report_pdf_generation_index_page.css"
      type="text/css"
    />
    <link
      rel="stylesheet"
      href="./assets/css/report_pdf_generation_page1.css"
      type="text/css"
    />
    <link
      rel="stylesheet"
      href="./assets/css/report_pdf_generation_page2.css"
      type="text/css"
    />
    <link
      rel="stylesheet"
      href="./assets/css/booth_model.css"
      type="text/css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css"
      type="text/css"
    />
    <style id="plotly.js-style-global"></style>
       <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  </head>
  <style>
    .btn-primary {
      color: unset;
      background-color: unset;
      border-color: unset;
      border: none;
    }

    .btn {
      display: inline-block;
      font-weight: 400;
      line-height: 1.5;
      color: #212529;
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      background-color: unset;
      border: none;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      border-radius: unset;
      transition: unset;
    }

    img[src*="#thumbnail"] {
      width: 200px;
      height: 100px;
    }

    .mantine-1n1p8xp {
      -webkit-tap-highlight-color: transparent;
      display: block;
      text-decoration: none;
      color: rgb(0, 0, 0);
      box-sizing: border-box;
      border-radius: 20px;
      box-shadow: rgb(0 0 0 / 5%) 0px 1px 3px,
        rgb(0 0 0 / 5%) 0px 28px 23px -7px, rgb(0 0 0 / 4%) 0px 12px 12px -7px;
      position: fixed;
      width: 92%;
      outline: 0px;
      background-color: rgb(255, 255, 255);
      z-index: 1;
      margin-left: calc(var(--removed-scroll-width, 0px) * -1);
      padding: unset;
      height: 88vh;
    }

    .mantine-Modal-root mantine-bsiqi3 {
      height: 100vh;
    }

    /* .form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: unset;
    background-color: #fff;
    background-clip: padding-box;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    transition: unset;
    border-color: unset;
    box-shadow: none !important;
} */
    .form-control:focus {
      box-shadow: none !important;
    }

    */ .booth_tab_container {
      display: none !important;
    }

    .btn:focus {
      box-shadow: none !important;
      background-color: unset;
    }

    .row {
      --bs-gutter-x: 0;
      --bs-gutter-y: 0;
      display: flex;
      flex-wrap: wrap;
    }

    .btn-primary:hover {
      background-color: unset;
    }

    .rc-slider-handle-1 {
      position: absolute;
      width: 24px;
      height: 24px;
      cursor: pointer;
      cursor: -webkit-grab;
      margin-top: -9px;
      cursor: grab;
      border-radius: 50%;
      border: solid 1px rgb(218, 67, 53) !important;
      background-color: rgb(218, 67, 53) !important;
      touch-action: pan-x;
    }

    .rc-slider-handle-2 {
      position: absolute;
      width: 24px;
      height: 24px;
      cursor: pointer;
      cursor: -webkit-grab;
      margin-top: -9px;
      cursor: grab;
      border-radius: 50%;
      border: solid 1px #5dae52 !important;
      background-color: #5dae52 !important;
      touch-action: pan-x;
    }

    /* .tab-container.jsx-4017309047 {
    display: none;
} */
    .mantine-Paper-root {
      transition-property: transform, opacity;
      transition-duration: 250ms;
      transition-timing-function: ease;
      transform-origin: center center;
      opacity: 1;
      transform: scale(1);
      width: 90%;
      flex-wrap: wrap-reverse;
    }

    .mantine-l553vn {
      word-break: unset;
      height: 100%;
    }

    .jsx-4017309047 {
      height: 100%;
    }

    .dash-table-container {
      height: 100%;
    }

    .dash-spreadsheet-container {
      height: 100%;
    }

    .dt-table-container__row {
      height: 100%;
    }

    .cell cell-1-1 dash-fixed-content {
      height: 100%;
    }

    .VirtualizedSelectOption {
      line-height: 12px;
      font-size: 0.9em;
      text-overflow: ellipsis;
      white-space: wrap;
      overflow: hidden;
    }

    .top_nav_button .btn:hover {
      color: #212529;
    }

    /* .modal-dialog {
    max-width: 800px;
    margin: 1.75rem auto;
    max-height: 500px;
} */
    /* .modal-content {
    border-radius: 20px;
} */
    /* .x2y2 {
    border-color: orchid;
} */
    .dash-graph {
      height: 100%;
    }

    /* .sunburst_chart_demography_style .dash-graph {
    height: unset !important;
} */

    .dash-table-container .dash-spreadsheet-container {
      display: block !important;
      flex-direction: row;
      position: relative;
      line-height: initial;
    }

    .dash-spreadsheet.dash-freeze-top,
    .dash-spreadsheet.dash-virtualized {
      max-height: 600px !important;
    }

    .dash-spreadsheet-container.dash-spreadsheet.dash-freeze-top.dash-no-filter.dash-fill-width {
      width: 100%;
      overflow-y: hidden !important;
    }

    .accordion-flush .accordion-item .accordion-button {
      border-radius: 0;
      font-size: 1.3rem !important;
      font-family: "Segoe UI";
    }

    .tab--selected.all_party_tab_style,
    .tab.all_party_tab_style:last-of-type.tab--selected {
      border: none !important;
      border-bottom: 4px solid #fe6160 !important;
      border-radius: "1rem" !important;
    }

    .booth_page_tooltip_style .tooltip-inner {
      max-width: 50rem !important;
      padding: 0.25rem 0.5rem;
      color: rgb(4, 3, 3) !important;
      text-align: center;
      background-color: rgb(255, 255, 255) !important;
      border-radius: 20px !important;
      margin-top: 5px;
    }

    .booth_page_tooltip_style .bs-tooltip-bottom {
      width: 25rem !important;
      border-radius: "30px" !important;
    }

    .booth_page_tooltip_style .tooltip.show {
      opacity: 10 !important;
      border-radius: 20px !important;
    }

    /* winner tooltip css */
    .winner_tooltip .tooltip-inner {
      min-width: 100px;
      background-color: white;
      color: black;
      box-shadow: 0 0.4rem 1rem rgb(0 0 0 / 15%) inset !important;
    }

    .winner_tooltip .bs-tooltip-top .tooltip-arrow::before,
    .bs-tooltip-auto[data-popper-placement^="top"] .tooltip-arrow::before {
      border-top-color: white;
    }

    .winner_tooltip .bs-tooltip-end .tooltip-arrow::before,
    .bs-tooltip-auto[data-popper-placement^="right"] .tooltip-arrow::before {
      border-right-color: white;
    }

    .winner_tooltip .bs-tooltip-bottom .tooltip-arrow::before,
    .bs-tooltip-auto[data-popper-placement^="bottom"] .tooltip-arrow::before {
      border-bottom-color: white;
    }

    .winner_tooltip .bs-tooltip-start .tooltip-arrow::before,
    .bs-tooltip-auto[data-popper-placement^="left"] .tooltip-arrow::before {
      border-left-color: white;
    }

    /* runner_tooltip tooltip css */
    .runner_tooltip .tooltip-inner {
      min-width: 100px;
      background-color: white;
      box-shadow: 0 0.4rem 1rem rgb(0 0 0 / 15%) inset !important;
      color: black;
    }

    .runner_tooltip .bs-tooltip-top .tooltip-arrow::before,
    .bs-tooltip-auto[data-popper-placement^="top"] .tooltip-arrow::before {
      border-top-color: white;
    }

    .runner_tooltip .bs-tooltip-end .tooltip-arrow::before,
    .bs-tooltip-auto[data-popper-placement^="right"] .tooltip-arrow::before {
      border-right-color: white;
    }

    .runner_tooltip .bs-tooltip-bottom .tooltip-arrow::before,
    .bs-tooltip-auto[data-popper-placement^="bottom"] .tooltip-arrow::before {
      border-bottom-color: white;
    }

    .runner_tooltip .bs-tooltip-start .tooltip-arrow::before,
    .bs-tooltip-auto[data-popper-placement^="left"] .tooltip-arrow::before {
      border-left-color: white;
    }

    /* third_party_tooltip tooltip css */
    .third_party_tooltip .tooltip-inner {
      min-width: 100px;
      background-color: white;
      box-shadow: 0 0.4rem 1rem rgb(0 0 0 / 15%) inset !important;
      color: black;
    }

    .third_party_tooltip .bs-tooltip-top .tooltip-arrow::before,
    .bs-tooltip-auto[data-popper-placement^="top"] .tooltip-arrow::before {
      border-top-color: white;
    }

    .third_party_tooltip .bs-tooltip-end .tooltip-arrow::before,
    .bs-tooltip-auto[data-popper-placement^="right"] .tooltip-arrow::before {
      border-right-color: white;
    }

    .third_party_tooltip .bs-tooltip-bottom .tooltip-arrow::before,
    .bs-tooltip-auto[data-popper-placement^="bottom"] .tooltip-arrow::before {
      border-bottom-color: white;
    }

    .third_party_tooltip .bs-tooltip-start .tooltip-arrow::before,
    .bs-tooltip-auto[data-popper-placement^="left"] .tooltip-arrow::before {
      border-left-color: white;
    }

    .rc-slider-mark-text {
      position: absolute;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      cursor: pointer;
      color: rgb(0, 0, 0) !important;
    }

    /*  navbar toggle button style  */
    .navbar_toggle_switch_default .daq-booleanswitch--light__button {
      background-color: #c31924 !important;
    }

    .navbar_toggle_switch_aiadmk_ammk .daq-booleanswitch--light__button {
      background-color: #219208 !important;
    }

    .navbar_toggle_switch_ntk .daq-booleanswitch--light__button {
      background-color: #d92023 !important;
    }

    .navbar_toggle_switch_bjp .daq-booleanswitch--light__button {
      background-color: #fa7d0a !important;
    }

    .navbar_toggle_switch_inc .daq-booleanswitch--light__button {
      background-color: #0096ff !important;
    }

    .navbar_toggle_switch_mnm .daq-booleanswitch--light__button {
      background-color: #d50505 !important;
    }

    .navbar_toggle_switch_pmk .daq-booleanswitch--light__button {
      background-color: #f26611 !important;
    }

    .column-7 .dash-cell-value {
      font-size: 35px !important;
      cursor: pointer;
    }

    .ag-cell-value {
      color: white !important;
    }

    .bg-warning {
      background-color: rgb(233, 149, 62) !important;
    }

    .bg-danger {
      background-color: rgb(218, 67, 53) !important;
    }
    .bg-success {
      background-color: rgb(93, 174, 82) !important;
    }

    .cell--selected {
      background-color: #c31924 !important;
    }

    /* survey modal css */
    .surevy_modal_first_div_style {
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) inset !important;
    }

    .survey_modal_style {
      font-family: Averia + Libre;
    }

    .qualitaive_modal_main_div {
      overflow-y: scroll;
    }

    .column_shadow_table_div {
      box-shadow: 0 0.5rem 1rem rgb(195 191 191 / 15%) inset !important;
    }

    .multi_color_div {
      background: linear-gradient(
        to right,
        #259390 0%,
        #259390 50%,
        #45aeae 50%,
        #45aeae 100%
      );
      border-radius: 50%;
    }

    .main-svg {
      background-color: unset !important;
    }

    .Select--single > .Select-control .Select-value,
    .Select-placeholder {
      color: black;
    }

    /* Manoj Changes */
    .mantine-Modal-header {
      float: right;
      /* background-color: red; */
    }

    .mantine-Paper-root {
      border-radius: 30px;
      padding: unset;
      height: 90vh;
    }

    /* .dmk-structure-header-container {} */
    .dmk-structure-header {
      font-size: 28px;
      font-weight: 500;
      text-align: center;
      background-color: #c31924;
      height: 70px;
      border-radius: 30px 30px 0px 0px;
      color: white;
    }

    .mantine-Modal-close {
      position: relative;
      right: 35px;
      top: 15px;
      color: white;
      font-weight: bold;
    }

    .mantine-Modal-close:hover {
      background-color: #212529;
      border-radius: 50%;
    }

    .dmk-struct-heading {
      text-align: center;
      display: inline-block;
      padding: 20px;
      text-transform: uppercase;
    }

    button svg {
      height: 30px;
      width: 30px;
    }

    /* .set-range-content.row {
    justify-content: flex-end !important;
    margin-right: 10px !important;
    width: 100%;
} */

    .set-range-container {
      border-radius: 30px;
      padding: 10px;
      padding-top: 5px;
    }

    .order-toggle {
      padding-bottom: 20px !important;
    }

    /*  ALL PARTY MODAL STYLING */

    .all_party_main_modal_style {
      height: 90%;
    }

    .all_party_main_modal_style .modal-content {
      height: 90%;
    }

    .all_party_modal_body_style {
      height: 82% !important;
    }

    .all_party_year_selector_style {
      font-size: 1.2rem;
    }

    .all_party_back_button_style {
      font-size: 3rem;
    }

    .all_party_ac_name_style {
      font-size: 1.7rem;
      font-weight: 500;
    }

    /*  candidate modal css */
    .candidate_details_div_style {
      box-shadow: inset 0px 3px 6px #00000029;
    }

    .modal-content {
      border-radius: 30px;
    }

    .modal-header {
      border-bottom: unset !important;
    }

    path.yzl.zl.crisp {
      stroke: black !important;
      stroke-width: 1px !important;
    }

    .toggle-label-true {
      position: relative;
      top: -22px;
      left: 41px;
      color: #fe6160;
      font-weight: bold;
      font-size: 10px;
      width: fit-content;
    }

    .toggle-label-false {
      position: relative;
      top: -21px;
      left: 15px;
      color: #fe6160;
      font-weight: bold;
      font-size: 10px;
      width: fit-content;
    }

    .dash-select-cell input {
      display: flex !important;
      width: 100% !important;
    }

    .full-height {
      height: 100% !important;
      padding-left: 0.5px;
      padding-right: 0.5px;
      position: relative;
      z-index: 999;
    }

    .ag-header-cell-label {
      justify-content: center !important;
    }

    .tab-content > div {
      height: 100% !important;
      width: 100% !important;
    }
    .tab-content > div > div {
      height: 100% !important;
      width: 100% !important;
      position: absolute;
    }

    .booth_each_table_graph_style.modal-dialog {
      height: 100vh !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      max-width: 70% !important;
    }

    .overflow_dropdown_css .Select-menu-outer {
      height: 12em !important;

      overflow-y: scroll !important;
    }

    .dash-spinner-container {
      background-color: inherit !important;
      width: 100% !important;
    }

    .booth_ac_name_display_div {
      font-size: 17px;
    }

    .booth_modal_exit_icon_style {
      position: absolute;
      left: 2px;
      font-size: 3rem;
      cursor: pointer;
    }

    .booth_lb_search_dropdown {
      border-radius: 10px;
      height: 3rem;
    }

    .booth_modal_acname_filter_button_row {
      height: 9%;
    }

    .booth_ac_name_display_main_col {
      height: 100%;
    }

    .booth_top_filter_buttons_maindiv {
      height: 100%;
    }

    .booth_top_filter_buttons_div_row {
      height: 70%;
      align-items: center;
    }

    .booth_filter_data_icon {
      font-size: 2rem;
    }

    .booth_other_party_label,
    .booth_margin_slider_label,
    .booth_turnout_slider_label {
      font-size: 12px;
    }

    .booth_info_table_trigger_icon {
      font-size: 20px;
      background-color: #ffb2b2;
      border-radius: 30px;
      color: white;
    }

    .booth_table_graphs_trigger_icon {
      font-size: 20px;
      background-color: #4545e6;
      border-radius: 30px;
      color: white;
    }

    .booth_local_body_table_trigger_icon {
      font-size: 20px;
      background-color: #4545e6;
      border-radius: 30px;
      color: white;
    }

    .booth_all_graph_div_style {
      height: 300px;
      border-radius: 30px;
    }

    .booth_all_graphs_legend_icon_style {
      font-size: 30px;
    }

    .booth_inner_modal_font_title {
      font-size: 1.2rem;
    }

    .booth_inner_modal_label {
      font-size: 1.1rem;
    }

    .booth_innermodal_results_font,
    .candidate_modal_label_font {
      font-size: 1rem;
    }

    .booth_each_table_graph_style.modal-dialog {
      height: 100vh;
    }

    .inner_booth_modal_tab_style {
      height: 100% !important;
    }

    .all_graph_range_slider {
      padding: 0% !important;
    }

    /*  candidate modal css */

    .candidate_modal_title_style {
      font-size: 2.1rem;
    }

    .candidate_modal_subtitle_style {
      font-size: 1.7rem;
    }

    .first-page {
      padding: unset !important;
    }

    .previous-next-container {
      margin-right: 10px;
    }

    .margin_slider_function .rc-slider-handle,
    .turnout_slider_function .rc-slider-handle {
      transform: scale(1.2) !important;
    }

    @media screen and (min-width: 700px) and (max-width: 1195px) {
      .booth_ac_name_display_div {
        font-size: 14px;
        font-weight: 500;
      }

      /* .booth_innermodal_candidate_ageRange_div{
        width: 100% !important;
    } */

      .booth_modal_exit_icon_style {
        position: absolute;
        left: 1px;
        font-size: 2rem;
        cursor: pointer;
        top: -2px;
      }

      .booth_all_graph_div_style {
        width: 43% !important;
      }

      .booth_inner_modal_icons_div {
        height: unset !important;
        width: unset !important;
        padding-left: 5%;
        padding-right: 8%;
      }

      .booth_inner_modal_icon_div {
        height: 5.5rem !important;
      }

      .booth_modal_filter_button {
        width: 23% !important;
      }

      .booth_inner_modal_font_title_vote {
        width: 100% !important;
        border-bottom: 1px solid;
      }

      .booth_innermodal_candidate_ageRange_div {
        width: 100% !important;
      }

      .booth_filter_button_text {
        padding-left: unset !important;
        font-size: 0.5rem !important;
      }

      .booth_filter_button_count {
        padding-left: unset !important;
      }

      .booth_modal_acname_filter_button_row {
        height: 7%;
      }

      .top_filter_buttons {
        font-size: 10px;
      }

      .booth_filter_data_icon {
        font-size: 1.2rem;
      }

      .booth_other_party_label,
      .booth_margin_slider_label,
      .booth_turnout_slider_label {
        font-size: 8px;
      }

      .booth_info_table_trigger_icon {
        font-size: 10px;
        background-color: #ffb2b2;
        border-radius: 30px;
        color: white;
      }

      .booth_table_graphs_trigger_icon {
        font-size: 10px;
        background-color: #4545e6;
        border-radius: 30px;
        color: white;
      }

      .booth_local_body_table_trigger_icon {
        font-size: 10px;
        background-color: #4545e6;
        border-radius: 30px;
        color: white;
      }

      .rc-slider-handle-1 {
        position: absolute;
        width: 15px;
        height: 15px;
        cursor: pointer;
        cursor: -webkit-grab;
        margin-top: -6px;
        cursor: grab;
        border-radius: 50%;
        border: solid 1px #e9953e !important;
        background-color: #e9953e !important;
        touch-action: pan-x;
      }

      .rc-slider-handle-2 {
        position: absolute;
        width: 15px;
        height: 15px;
        cursor: pointer;
        cursor: -webkit-grab;
        margin-top: -6px;
        cursor: grab;
        border-radius: 50%;
        border: solid 1px #5dae52 !important;
        background-color: #5dae52 !important;
        touch-action: pan-x;
      }

      .booth_tooltip_font_size,
      .booth_all_graphs_legend_icon_style,
      .booth_all_graphs_legend_style {
        font-size: 10px;
      }

      .booth_all_graph_div_style {
        height: 250px;
        border-radius: 25px;
      }

      /* All party modal */

      .all_party_modal_body_style {
        height: 80% !important;
      }

      .all_party_year_selector_style {
        font-size: 0.8rem;
      }

      .all_party_back_button_style {
        font-size: 1.7rem;
      }

      .all_party_ac_name_style {
        font-size: 1rem;
        font-weight: 500;
      }

      .booth_inner_modal_font_title {
        width: 100% !important;
        border-right: unset !important;
      }

      .booth_inner_modal_font_title,
      .booth_inner_modal_label {
        font-size: 0.6rem;
      }

      .booth_innermodal_results_font,
      .candidate_modal_label_font {
        font-size: 0.6rem;
      }

      .booth_each_table_graph_style.modal-dialog {
        height: 92vh !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        max-width: 75% !important;
      }

      .inner_booth_modal_tab_style {
        height: 100% !important;
      }

      .booth_each_table_graph_style .modal-content {
        height: 75% !important;
      }

      .candidate_modal_title_style {
        font-size: 1.5rem;
      }

      .candidate_modal_subtitle_style {
        font-size: 1.3rem;
      }

      .booth_inner_modal_graphdiv {
        height: 70% !important;
      }

      .candidate_modal_info_div_image {
        height: 100% !important;
      }

      .candidate_modal_info_div_main {
        height: unset !important;
      }

      .camdidate_modal_info_div_title {
        font-size: 0.8rem !important;
        text-align: center;
      }
    }

    /*  Mobile view */

    @media screen and (max-width: 700px) {
      .about_candidate_div_outer_modal {
        margin-top: unset !important;
      }

      .candidate_position_div_outer_modal {
        margin-top: unset !important;
        font-size: 0.8rem !important;
      }

      .candidate_modal_subtitle_style {
        font-size: 1.1rem !important;
        margin-top: unset !important;
      }

      .booth_inner_modal_font_title_vote {
        width: 100% !important;
        border-bottom: 1px solid;
      }

      .booth_ac_name_display_div {
        font-size: 0.7rem !important;
      }
      .booth_innermodal_candidate_ageRange_div {
        width: 100% !important;
      }

      .booth_inner_modal_font_title {
        font-size: 0.8rem !important;
      }

      .booth_info_table_trigger_icon {
        font-size: 15px !important;
        border-radius: 30px;
        color: white;
      }

      .booth_table_graphs_trigger_icon {
        font-size: 15px !important;
      }

      .booth_local_body_table_trigger_icon {
        font-size: 15px !important;
      }

      .booth_modaltab_switching_container {
        height: 100% !important;
      }

      .mantine-Paper-root {
        width: 96% !important;
      }

      .dmk-structure-header {
        font-size: 15px;
        font-weight: 500;
        text-align: center;
        background-color: #c31924;
        height: 70px;
        color: white;
      }

      /* Booth Modal Window */

      .booth_modal_acname_filter_button_row {
        height: 12% !important;
      }

      .booth_ac_name_display_main_col {
        height: 50% !important;
        width: 50% !important;
        display: flex !important;
        justify-content: center;
        align-items: center !important;
      }

      .booth_ac_search_bar_div {
        height: 50% !important;
        width: 50% !important;
      }

      .booth_top_filter_buttons_maindiv {
        height: 50% !important;
        width: 100% !important;
      }

      /* .booth_table_filter_data_tooltip{

    } */

      .booth_modal_filter_button {
        padding: unset !important;
        width: 23% !important;
      }

      .booth_main_table_container {
        height: 60% !important;
      }

      .top_filter_buttons {
        font-size: 0.5rem !important;
      }

      .booth_modal_lb_serachbox_main_div {
        height: 27px !important;
      }

      .booth_lb_search_dropdown {
        height: 100% !important;
      }

      .booth_dropdown_main_child_column {
        height: 100% !important;
        padding: unset !important;
      }

      .booth_search_dropdown_mainrow {
        align-items: unset !important;
        height: 100% !important;
      }

      .Select-multi-value-wrapper {
        height: 18px !important;
      }

      .Select-placeholder {
        margin-top: auto !important;
        margin-bottom: auto !important;
      }

      .booth_filter_button_text {
        padding-left: unset !important;
      }

      .booth_filter_button_count {
        padding-left: unset !important;
      }

      .booth_empty_container {
        display: none !important;
      }

      .booth_rangeslider_main_container {
        width: 100% !important;
        height: 70% !important;
      }

      .booth_rangeslider_sub_container {
        height: 100% !important;
        width: 100% !important;
      }

      .booth_tabs_switching_main_container {
        height: 30% !important;
        width: 100% !important;
      }

      .booth_table_filtering_sliders_div {
        height: 20% !important;
      }

      .booth_other_party_label_div {
        height: 30% !important;
        width: 40% !important;
      }

      .booth_other_party_slider_div {
        height: 30% !important;
        width: 60% !important;
      }

      .booth_margin_label_div {
        height: 30% !important;
        width: 40% !important;
      }

      .booth_margin_slider_div {
        height: 30% !important;
        width: 60% !important;
      }

      .booth_turnout_label_div {
        height: 30% !important;
        width: 40% !important;
      }

      .booth_turnout_slider_container {
        height: 30% !important;
        width: 60% !important;
      }

      .booth_table_filter_button {
        visibility: hidden !important;
      }

      .rc-slider-tooltip-inner {
        height: 13px !important;
        width: 10px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
      }

      /* GRAPHS DIV */

      .booth_modal_whole_graph_view_div {
        display: flex !important;
        flex-direction: column-reverse !important;
        margin-top: unset !important;
      }

      .booth_modal_grphs_div {
        padding-top: unset !important;
        width: 100% !important;
      }

      .booth_all_graphs_legend_style {
        width: 100% !important;
        padding-top: unset !important;
        height: 50% !important;
        display: grid !important;
      }

      .booth_modal_legend_one {
        grid-column-start: 1;
        grid-column-end: 6;
      }

      .booth_modal_legend_two {
        grid-column-start: 7;
        grid-column-end: 12;
      }

      .booth_modal_legend_three {
        grid-column-start: 1;
        grid-column-end: 6;
      }

      .booth_modal_legend_four {
        grid-column-start: 7;
        grid-column-end: 12;
      }

      .booth_modal_legend_five {
        grid-column-start: 1;
        grid-column-end: 6;
      }

      .booth_modal_legend_six {
        grid-column-start: 7;
        grid-column-end: 12;
      }

      .booth_all_graph_div_style {
        width: 80% !important;
      }

      /* Modal inside Booth  */

      .booth_each_table_graph_style.modal-dialog {
        height: 100vh !important;
        max-width: 80% !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }

      .inner_booth_modal_tab_style {
        display: flex !important;
        flex-direction: column !important;
      }

      .candidate_details_div_style {
        height: 50% !important;
        width: 100% !important;
      }

      .booth_innermodal_candidate_detailboxes {
        max-height: unset !important;
        height: 50% !important;
        width: 100% !important;
        margin-left: unset !important;
      }

      .booth_innermodal_candidate_boxOne {
        height: 60% !important;
        width: 100% !important;
        padding-top: 10% !important;
      }

      .booth_innermodal_candidate_boxtwo {
        height: 30% !important;
        width: 100% !important;
      }

      .candidate_details_div_style_inner {
        height: 100% !important;
      }

      .booth_inner_modal_icons_div {
        height: 50% !important;
        width: 40% !important;
        padding-left: 5%;
        padding-right: 8%;
      }

      .booth_inner_modal_icon_div {
        height: 80% !important;
      }

      .booth_inner_modal_label {
        margin-top: unset !important;
        font-size: 0.7rem !important;
        margin-bottom: 5px !important;
      }

      .booth_inner_modal_font_title {
        padding: unset !important;
      }

      .booth_no_voters_detail {
        text-align: center;
        padding-top: 18%;
      }

      .booth_inner_modal_graphdiv {
        height: 65% !important;
      }

      /* candidate Modal Styles */

      .candidate_details_div_style {
        height: 50% !important;
      }
      .candidate_details_div_style_booth {
        height: 35% !important;
      }

      .candidate_modal_info_div,
      .candidate_modal_info_div_age {
        height: 40% !important;
        width: 50% !important;
      }

      .camdidate_modal_info_div_title {
        font-size: 0.8rem !important;
      }

      .candidate_modal_info_div_age {
        border-right: unset !important;
      }

      .candidate_modal_info_div_image {
        height: 50% !important;
      }

      .candidate_modal_title_style {
        font-size: 1.3rem !important;
      }

      /* LOGIN PAGE  */

      .login_page_main {
        display: flex;
        flex-direction: column;
      }

      /*  ALL PARTY TABS */

      .all_party_year_selector_style {
        padding: unset !important;
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
        text-align: center !important;
      }

      .candidate_position_div_outer_modal_two {
        margin-top: unset !important;
      }

      .all_party_year_selector_div {
        padding-left: unset !important;
        padding: unset !important;
      }

      .booth_each_table_graph_style .modal-content {
        height: 100% !important;
      }
    }
    .reportpdf_secondpage_black_bar {
      margin: 1rem 0;
      height: 0.3rem;
      background-color: black;
    }

    .page-break {
      page-break-after: always;
    }

    .reportpdf_secondpage_graphContainer {
      margin: 0.5rem;
      border-radius: 4px;
    }

    .reportpdf_secondpage_graphContainer .titleSection {
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
    }

    .reportpdf_secondpage_graphContainer .titleSection .titleBox {
      flex: 60%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background-color: black;
      color: white;
      padding: 1rem 1rem;
    }

    .reportpdf_secondpage_graphContainer .titleSection .statBox {
      flex: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 1rem;
      font-weight: 700;
    }

    .reportpdf_secondpage_graph {
      height: 100%;
      margin: 0 auto;
    }

    .reportpdf_header {
      text-transform: uppercase;
      display: flex;
      color: white;
      height: 5rem;
      font-size: 1.2rem;
    }

    .section-1-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .section-1-img-div {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-left: 2px solid #80808020;
      padding: 0 2rem;
    }
    .section-1-title p,
    .section-1-img-div p {
      margin: 0;
    }

    .section-1-profile-card {
      display: flex;
      justify-content: flex-start;
      border-radius: 8px;
      padding: 0.5rem;
      flex: 33%;
      box-shadow: 0 0 1px 5px rgb(238, 238, 238);
    }
    .section-1-profile-card p {
      margin: 0;
    }

    .section-1-profile-card-img {
      margin-right: 3rem;
      height: 5rem;
      width: 8rem;
      border-radius: 8px;
    }

    .font-sm {
      font-size: 0.8em;
    }

    .title-trapezoid {
      background-color: #111111;
      color: #ffffff;
    }

    .section-2-table-header {
      background: #ab2d24;
      padding: 0.2rem;
      color: #ffffff;
      border-radius: 4px;
      width: 100%;
    }

    .section-2-table-body {
      width: 100%;
      display: flex;
      flex: auto;
      background: #fff;
      justify-content: space-between;
      align-items: center;
    }

    .horizontal-divider {
      height: 1px;
      background-color: #111;
      width: 80%;
      margin: 1rem 0;
    }

    .table-content {
      flex: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 0;
    }

    .vertical-divider {
      width: 1px;
      background-color: #111;
      height: 6rem;
    }

    .count-table {
      display: flex;
      flex: auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .bg-red {
      background: #ab2d24;
    }

    /* #region trapezoid */
    .trapezoid {
      position: relative;
      width: fit-content;
      height: 0;
      text-align: center;
    }

    .trapezoid-right {
      padding-right: 4rem;
      padding-left: 1rem;
      border-bottom: 2rem solid black;
      border-right: 3rem solid transparent;
    }

    .trapezoid-both {
      padding: 0 1rem;
      border-bottom: 4rem solid black;
      border-right: 3rem solid transparent;
      border-left: 3rem solid transparent;
    }

    .trapezoid .text {
      color: white;
      font-size: 1rem;
      line-height: 4rem;
      text-wrap: wrap;
      text-align: center;
    }

    .line-height-2rem {
      line-height: 2rem !important;
    }

    /* #endregion */

    .party-logo {
      height: 40px;
      width: 70px;
      background-color: #f2f0f0;
      display: flex;
      justify-content: center;
      border-radius: 4px;
    }

    .party-logo img {
      aspect-ratio: 1 / 1;
      object-fit: contain;
    }

    .index-table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.25rem;
      border-top-right-radius: 16px;
      border-top-left-radius: 16px;
      padding: 1rem 1.5rem;
      font-weight: 600;
      text-transform: uppercase;
      position: absolute;
      width: 100%;
    }

    .index-table-body {
      min-height: 10rem;
      align-items: center;
      border-bottom-right-radius: 16px;
      border-bottom-left-radius: 16px;
      font-weight: 500;
      text-transform: uppercase;
      background-color: #fcfafa;
      position: relative;
    }

    .index-table-row {
      height: 3rem;
      align-items: center;
      display: flex;
      position: relative;
    }

    .index-table-dots::after {
      content: "";
      position: absolute;
      bottom: 0.7rem;
      left: 0;
      width: 98%;
      border-bottom: 1px dashed black;
      z-index: 0;
    }

    .bring-front {
      padding-right: 1rem;
      z-index: 1;
      background: #fcfafa;
      position: relative;
    }

    /* this enables background graphics in print preview */
    * {
      -webkit-print-color-adjust: exact !important; /* Chrome, Safari 6 – 15.3, Edge */
      color-adjust: exact !important; /* Firefox 48 – 96 */
      print-color-adjust: exact !important; /* Firefox 97+, Safari 15.4+ */
    }

    @page {
      margin: 0 !important;
    }
  </style>
`;
