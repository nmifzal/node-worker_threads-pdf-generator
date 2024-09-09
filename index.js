const puppeteer = require("puppeteer");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs").promises;
const path = require("path");
const { Worker, isMainThread, workerData } = require("worker_threads");
const os = require("os");
const { performance } = require("perf_hooks");
const styles = require("./template_style");
const scripts = require("./template_script");

const originalData = [
  {
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "ROBERT BRUCE, C.",
    hierarchy: { level: "PC", name: "Tirunelveli", num: "38" },
    margin_count: { 2024: 165062 },
    margin_percentage: { 2024: 15.56 },
    dmk_vote_count: { 2024: 499493 },
    dmk_vote_share: { 2024: 47.09 },
    top_n_candidate_info: {
      1: {
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 499493,
        total: 1060656,
        maxi: 499493,
        vote_share: 47.09,
        margin_count: 165062,
        margin_percentage: 15.56,
        pc_no: 38,
        name: "Tirunelveli",
        label: "ParliamentaryConstituency",
        rank: 1.0,
        image: "url",
      },
      2: {
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 334431,
        total: 1060656,
        maxi: 499493,
        vote_share: 31.53,
        margin_count: -165062,
        margin_percentage: -15.56,
        pc_no: 38,
        name: "Tirunelveli",
        label: "ParliamentaryConstituency",
        rank: 2.0,
        image: "url",
      },
      3: {
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 88996,
        total: 1060656,
        maxi: 499493,
        vote_share: 8.39,
        margin_count: -410497,
        margin_percentage: -38.7,
        pc_no: 38,
        name: "Tirunelveli",
        label: "ParliamentaryConstituency",
        rank: 3.0,
        image: "url",
      },
    },
    gender_stats: {
      male: 808127,
      female: 846225,
      others: 151,
      total: 1654503,
    },
    age_stats: {
      "18-30": 387599,
      "31-50": 691670,
      "51-80": 603438,
      "81+": 51677,
    },
    total_polled_votes: { 2024: 1060656 },
    pc_family_graph_data: {
      x: [
        "Dindigul",
        "Kancheepuram(SC)",
        "Theni",
        "Vellore",
        "Coimbatore",
        "Salem",
        "Erode",
        "Kallakurichi",
        "Tiruvannamalai",
        "Kanniyakumari",
        "Tiruchirappalli",
        "Karur",
        "Mayiladuthurai",
        "Chennai South",
        "Ramanathapuram",
        "Perambalur",
        "Chidambaram(SC)",
        "Tirunelveli",
        "Thanjavur",
        "Arani",
        "Chennai North",
        "Krishnagiri",
        "Viluppuram(SC)",
        "Nilgiris(SC)",
        "Tiruppur",
        "Nagapattinam(SC)",
        "Namakkal",
        "Pollachi",
        "Dharmapuri",
        "Sivaganga",
        "Tenkasi(SC)",
        "Virudhunagar",
        "Chennai Central",
      ],
      y: [
        667391, 582978, 569110, 566435, 565428, 562022, 558849, 558346, 543857,
        540267, 538877, 531829, 516534, 515307, 506690, 505348, 501851, 499493,
        498822, 497083, 495733, 491131, 474230, 470729, 470195, 462759, 457695,
        439166, 429301, 425631, 423025, 382876, 358637,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "IND",
        "NOTA",
        "IND",
        "BSP",
        "IND",
        "IND",
        "IND",
        "AJPK",
        "IND",
        "VTVTK",
        "BDP",
        "PMTDK",
        "AMK",
        "IND",
        "IND",
        "NIP",
        "IND",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        499493, 334431, 88996, 86918, 19802, 7285, 3744, 2044, 1888, 1829, 1493,
        1457, 1441, 1409, 1317, 1057, 1046, 913, 855, 790, 777, 685, 622, 364,
      ],
    },
    drilldown_data: {
      x: [
        "Palayamkottai",
        "Alangulam",
        "Tirunelveli",
        "Nanguneri",
        "Ambasamudram",
        "Radhapuram",
      ],
      y: [31.4, 14.69, 10.38, 13.71, 13.25, 12.14],
      x_axis_label: "Assembly Constituency",
      y_axis_label: "Margin Percentage",
    },
    total_electors: { 2024: 1654503 },
    lb_stats: {
      Town: 20,
      union: 14,
      Corporation: 2,
      Municipality: 4,
      "Total Local Bodies": 40,
      "Party Wards": 258,
    },
    booth_count: 1810,
  },
  {
    hierarchy: {
      level: "AC",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223)",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "ROBERT BRUCE, C.",
    margin_count: { 2024: 28058 },
    margin_percentage: { 2024: 14.69 },
    dmk_vote_count: { 2024: 84694 },
    dmk_vote_share: { 2024: 44.35 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 84694,
        total: 190971,
        maxi: 84694,
        margin_count: 28058,
        margin_percentage: 14.69,
        vote_share: 44.35,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 56636,
        total: 190971,
        maxi: 84694,
        margin_count: -28058,
        margin_percentage: -14.69,
        vote_share: 29.66,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 22339,
        total: 190971,
        maxi: 84694,
        margin_count: -62355,
        margin_percentage: -32.65,
        vote_share: 11.7,
        rank: 3.0,
        image: "url",
      },
    },
    gender_stats: {
      male: 127362,
      female: 133922,
      others: 20,
      total: 261304,
    },
    age_stats: {
      "18-30": 69378,
      "31-50": 114204,
      "51-80": 94091,
      "81+": 12015,
    },
    total_polled_votes: { 2024: 190971 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "BSP",
        "IND",
        "AJPK",
        "BDP",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
        "AMK",
        "PMTDK",
        "IND",
        "NIP",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        84694, 56636, 22339, 20382, 1562, 1312, 431, 376, 368, 353, 295, 273,
        232, 229, 229, 196, 174, 174, 166, 147, 109, 107, 104, 83,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
    drilldown_data: {
      x: [
        "\u0b95\u0b9f\u0bc8\u0baf\u0bae\u0bcd \u0bb5\u0b9f\u0b95\u0bcd\u0b95\u0bc1",
        "\u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0b95\u0bcd\u0b95\u0bc1\u0b9f\u0bbf",
        "\u0b95\u0b9f\u0bc8\u0baf\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1",
        "\u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1",
        "\u0b95\u0bc0\u0bb4\u0baa\u0bcd\u0baa\u0bbe\u0bb5\u0bc2\u0bb0\u0bcd \u0b95\u0bbf\u0bb4\u0b95\u0bcd\u0b95\u0bc1",
        "\u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0baa\u0bc7\u0bb0\u0bc2\u0bb0\u0bcd",
        "\u0b95\u0bc0\u0bb4\u0baa\u0bcd\u0baa\u0bbe\u0bb5\u0bc2\u0bb0\u0bcd \u0baa\u0bc7\u0bb0\u0bc2\u0bb0\u0bcd",
        "\u0bae\u0bc1\u0b95\u0bcd\u0b95\u0bc2\u0b9f\u0bb2\u0bcd \u0baa\u0bc7\u0bb0\u0bc2\u0bb0\u0bcd",
        "\u0b86\u0bb4\u0bcd\u0bb5\u0bbe\u0bb0\u0bcd \u0b95\u0bc1\u0bb1\u0bbf\u0b9a\u0bcd\u0b9a\u0bbf \u0baa\u0bc7\u0bb0\u0bc2\u0bb0\u0bcd",
      ],
      y: [
        15467.0, 14802.0, 13381.0, 11693.0, 9474.0, 5763.0, 5677.0, 3043.0,
        2946.0,
      ],
      x_axis_label: "Local Body",
      y_axis_label: "Votes",
    },
    total_electors: { 2024: 261304 },
    lb_stats: {
      Town: 4,
      union: 4,
      Corporation: 0,
      Municipality: 0,
      "Total Local Bodies": 8,
      "Party Wards": 25,
    },
    booth_count: 320,
  },
  {
    hierarchy: {
      level: "LB",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 2186.0 },
    margin_percentage: { 2024: 7.31 },
    dmk_vote_count: { 2024: 11693.0 },
    dmk_vote_share: { 2024: 39.12 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 11693.0,
        total: 29888.0,
        highest_vote: 11693.0,
        vote_share: 39.12,
        margin: 2186.0,
        margin_percentage: 7.31,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 9507.0,
        total: 29888.0,
        highest_vote: 11693.0,
        vote_share: 31.81,
        margin: -2186.0,
        margin_percentage: -7.31,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 3924.0,
        total: 29888.0,
        highest_vote: 11693.0,
        vote_share: 13.13,
        margin: -7769.0,
        margin_percentage: -25.99,
        rank: 3.0,
        image: "url",
      },
    },
    total_polled_votes: { 2024: 29888.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "NTK",
        "AIADMK",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "BSP",
        "BDP",
        "IND",
        "AJPK",
        "IND",
        "IND",
        "IND",
        "VTVTK",
        "AMK",
        "IND",
        "PMTDK",
        "IND",
        "NIP",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        11693.0, 9507.0, 3924.0, 3381.0, 260.0, 240.0, 118.0, 84.0, 77.0, 74.0,
        62.0, 61.0, 43.0, 43.0, 43.0, 42.0, 41.0, 37.0, 35.0, 31.0, 25.0, 23.0,
        23.0, 21.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
    drilldown_data: {
      x: [
        "\u0b9a\u0bc1\u0baa\u0bcd\u0baa\u0bc8\u0baf\u0bbe\u0baa\u0bc1\u0bb0\u0bae\u0bcd",
        "\u0ba8\u0bbe\u0bb0\u0ba3\u0baa\u0bc1\u0bb0\u0bae\u0bcd",
        "\u0bae\u0bbe\u0baf\u0bae\u0bbe\u0ba9\u0bcd\u0b95\u0bc1\u0bb0\u0bbf\u0b9a\u0bcd\u0b9a\u0bbf",
        "\u0b9a\u0bbf\u0bb5\u0bb2\u0bbe\u0bb0\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd",
        "\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd",
        "\u0bae\u0bbe\u0bb1\u0bbe\u0ba8\u0bcd\u0ba4\u0bc8",
        "\u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0ba9\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd",
        "\u0b95\u0b9f\u0b99\u0bcd\u0b95\u0ba8\u0bc7\u0bb0\u0bbf",
        "\u0ba8\u0bc6\u0b9f\u0bcd\u0b9f\u0bc2\u0bb0\u0bcd",
        "\u0b95\u0bbe\u0b9f\u0bc1\u0bb5\u0bc6\u0b9f\u0bcd\u0b9f\u0bbf",
        "\u0b95\u0bbe\u0bb5\u0bb2\u0bbe\u0b95\u0bc1\u0bb1\u0bbf\u0b9a\u0bcd\u0b9a\u0bbf",
        "\u0b85\u0baf\u0bcd\u0baf\u0ba9\u0bb0\u0bb0\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd",
        "\u0b95\u0bbf\u0b9f\u0bbe\u0bb0\u0b95\u0bc1\u0bb3\u0bae\u0bcd",
      ],
      y: [
        42.73, 25.54, 22.48, 16.59, 15.83, 13.09, 8.61, 2.68, 2.66, -10.58,
        -15.64, -19.67, -26.06,
      ],
      x_label: "Ward/VP",
      y_label: "Margin Percentage",
    },
    booth_count: 56,
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 1",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -178.0 },
    margin_percentage: { 2024: -27.73 },
    dmk_vote_count: { 2024: 194.0 },
    dmk_vote_share: { 2024: 30.22 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 1,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 372.0,
        total: 642.0,
        highest_vote: 372.0,
        vote_share: 57.94,
        margin: 178.0,
        margin_percentage: 27.73,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 1,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 194.0,
        total: 642.0,
        highest_vote: 372.0,
        vote_share: 30.22,
        margin: -178.0,
        margin_percentage: -27.73,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 1,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 33.0,
        total: 642.0,
        highest_vote: 372.0,
        vote_share: 5.14,
        margin: -339.0,
        margin_percentage: -52.8,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 197, "31-50": 358, "51-80": 290, "81+": 5 },
    total_polled_votes: { 2024: 642.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "AJPK",
        "IND",
        "IND",
        "VTVTK",
        "IND",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "BSP",
        "IND",
        "IND",
        "PMTDK",
        "IND",
        "NIP",
        "AMK",
        "IND",
      ],
      y: [
        372.0, 194.0, 33.0, 29.0, 4.0, 3.0, 2.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 2",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -94.0 },
    margin_percentage: { 2024: -16.26 },
    dmk_vote_count: { 2024: 196.0 },
    dmk_vote_share: { 2024: 33.91 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 2,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 290.0,
        total: 578.0,
        highest_vote: 290.0,
        vote_share: 50.17,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 2,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 196.0,
        total: 578.0,
        highest_vote: 290.0,
        vote_share: 33.91,
        margin: -94.0,
        margin_percentage: -16.26,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 2,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 43.0,
        total: 578.0,
        highest_vote: 290.0,
        vote_share: 7.44,
        margin: -247.0,
        margin_percentage: -42.73,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 195, "31-50": 342, "51-80": 374, "81+": 16 },
    total_polled_votes: { 2024: 578.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "NTK",
        "AIADMK",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AMK",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "PMTDK",
        "IND",
        "NIP",
        "IND",
        "BSP",
        "AJPK",
        "VTVTK",
        "IND",
      ],
      y: [
        290.0, 196.0, 43.0, 32.0, 8.0, 4.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 3",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 185.0 },
    dmk_vote_share: { 2024: 46.6 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 3,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 185.0,
        total: 397.0,
        highest_vote: 185.0,
        vote_share: 46.6,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 3,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 125.0,
        total: 397.0,
        highest_vote: 185.0,
        vote_share: 31.49,
        margin: -60.0,
        margin_percentage: -15.11,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 3,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 36.0,
        total: 397.0,
        highest_vote: 185.0,
        vote_share: 9.07,
        margin: -149.0,
        margin_percentage: -37.53,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 105, "31-50": 221, "51-80": 222, "81+": 4 },
    total_polled_votes: { 2024: 397.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "NTK",
        "AIADMK",
        "NOTA",
        "IND",
        "BSP",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AJPK",
        "VTVTK",
        "PMTDK",
        "IND",
        "AMK",
        "IND",
        "IND",
        "IND",
        "BDP",
        "IND",
        "NIP",
      ],
      y: [
        185.0, 125.0, 36.0, 28.0, 7.0, 4.0, 3.0, 3.0, 3.0, 1.0, 1.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 4",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -40.0 },
    margin_percentage: { 2024: -18.52 },
    dmk_vote_count: { 2024: 67.0 },
    dmk_vote_share: { 2024: 31.02 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 4,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 107.0,
        total: 216.0,
        highest_vote: 107.0,
        vote_share: 49.54,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 4,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 67.0,
        total: 216.0,
        highest_vote: 107.0,
        vote_share: 31.02,
        margin: -40.0,
        margin_percentage: -18.52,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 4,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 21.0,
        total: 216.0,
        highest_vote: 107.0,
        vote_share: 9.72,
        margin: -86.0,
        margin_percentage: -39.81,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 64, "31-50": 136, "51-80": 123, "81+": 5 },
    total_polled_votes: { 2024: 216.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "IND",
        "BSP",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "PMTDK",
        "IND",
        "AMK",
        "AJPK",
        "VTVTK",
        "IND",
        "IND",
      ],
      y: [
        107.0, 67.0, 21.0, 5.0, 4.0, 4.0, 3.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 5",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 353.0 },
    dmk_vote_share: { 2024: 47.51 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 5,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 353.0,
        total: 743.0,
        highest_vote: 353.0,
        vote_share: 47.51,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 5,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 170.0,
        total: 743.0,
        highest_vote: 353.0,
        vote_share: 22.88,
        margin: -183.0,
        margin_percentage: -24.63,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 5,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 138.0,
        total: 743.0,
        highest_vote: 353.0,
        vote_share: 18.57,
        margin: -215.0,
        margin_percentage: -28.94,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 208, "31-50": 407, "51-80": 316, "81+": 7 },
    total_polled_votes: { 2024: 743.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "AIADMK",
        "BJP",
        "NTK",
        "NOTA",
        "BSP",
        "AJPK",
        "IND",
        "IND",
        "IND",
        "AMK",
        "IND",
        "IND",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "PMTDK",
        "IND",
        "IND",
        "VTVTK",
      ],
      y: [
        353.0, 170.0, 138.0, 52.0, 6.0, 4.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 6",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -50.0 },
    margin_percentage: { 2024: -10.66 },
    dmk_vote_count: { 2024: 171.0 },
    dmk_vote_share: { 2024: 36.46 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 6,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 221.0,
        total: 469.0,
        highest_vote: 221.0,
        vote_share: 47.12,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 6,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 171.0,
        total: 469.0,
        highest_vote: 221.0,
        vote_share: 36.46,
        margin: -50.0,
        margin_percentage: -10.66,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 6,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 35.0,
        total: 469.0,
        highest_vote: 221.0,
        vote_share: 7.46,
        margin: -186.0,
        margin_percentage: -39.66,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 145, "31-50": 234, "51-80": 226, "81+": 6 },
    total_polled_votes: { 2024: 469.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "NTK",
        "AIADMK",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AJPK",
        "PMTDK",
        "IND",
        "AMK",
        "IND",
        "NIP",
        "VTVTK",
        "IND",
        "IND",
        "BSP",
        "IND",
        "BDP",
        "IND",
        "IND",
      ],
      y: [
        221.0, 171.0, 35.0, 17.0, 9.0, 5.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 7",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 347.0 },
    dmk_vote_share: { 2024: 41.96 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 7,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 347.0,
        total: 827.0,
        highest_vote: 347.0,
        vote_share: 41.96,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 7,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 153.0,
        total: 827.0,
        highest_vote: 347.0,
        vote_share: 18.5,
        margin: -194.0,
        margin_percentage: -23.46,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 7,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 149.0,
        total: 827.0,
        highest_vote: 347.0,
        vote_share: 18.02,
        margin: -198.0,
        margin_percentage: -23.94,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 270, "31-50": 470, "51-80": 406, "81+": 7 },
    total_polled_votes: { 2024: 827.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "BSP",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "AJPK",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "AMK",
        "PMTDK",
      ],
      y: [
        347.0, 153.0, 149.0, 142.0, 8.0, 5.0, 4.0, 3.0, 3.0, 2.0, 2.0, 2.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 8",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -22.0 },
    margin_percentage: { 2024: -3.83 },
    dmk_vote_count: { 2024: 211.0 },
    dmk_vote_share: { 2024: 36.76 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 8,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 233.0,
        total: 574.0,
        highest_vote: 233.0,
        vote_share: 40.59,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 8,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 211.0,
        total: 574.0,
        highest_vote: 233.0,
        vote_share: 36.76,
        margin: -22.0,
        margin_percentage: -3.83,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 8,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 51.0,
        total: 574.0,
        highest_vote: 233.0,
        vote_share: 8.89,
        margin: -182.0,
        margin_percentage: -31.71,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 169, "31-50": 337, "51-80": 357, "81+": 10 },
    total_polled_votes: { 2024: 574.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "NTK",
        "AIADMK",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "AMK",
        "NIP",
        "IND",
        "IND",
        "IND",
        "BDP",
        "IND",
        "IND",
        "PMTDK",
        "IND",
        "IND",
        "IND",
        "BSP",
        "AJPK",
        "VTVTK",
        "IND",
      ],
      y: [
        233.0, 211.0, 51.0, 43.0, 22.0, 5.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 9",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -93.0 },
    margin_percentage: { 2024: -17.19 },
    dmk_vote_count: { 2024: 159.0 },
    dmk_vote_share: { 2024: 29.39 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 9,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 252.0,
        total: 541.0,
        highest_vote: 252.0,
        vote_share: 46.58,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 9,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 159.0,
        total: 541.0,
        highest_vote: 252.0,
        vote_share: 29.39,
        margin: -93.0,
        margin_percentage: -17.19,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 9,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 57.0,
        total: 541.0,
        highest_vote: 252.0,
        vote_share: 10.54,
        margin: -195.0,
        margin_percentage: -36.04,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 185, "31-50": 374, "51-80": 290, "81+": 7 },
    total_polled_votes: { 2024: 541.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "AIADMK",
        "NTK",
        "IND",
        "NOTA",
        "AJPK",
        "IND",
        "BDP",
        "BSP",
        "PMTDK",
        "IND",
        "AMK",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        252.0, 159.0, 57.0, 51.0, 9.0, 4.0, 3.0, 2.0, 2.0, 1.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 10",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -59.0 },
    margin_percentage: { 2024: -10.69 },
    dmk_vote_count: { 2024: 174.0 },
    dmk_vote_share: { 2024: 31.52 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 10,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 233.0,
        total: 552.0,
        highest_vote: 233.0,
        vote_share: 42.21,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 10,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 174.0,
        total: 552.0,
        highest_vote: 233.0,
        vote_share: 31.52,
        margin: -59.0,
        margin_percentage: -10.69,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 10,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 69.0,
        total: 552.0,
        highest_vote: 233.0,
        vote_share: 12.5,
        margin: -164.0,
        margin_percentage: -29.71,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 150, "31-50": 341, "51-80": 281, "81+": 10 },
    total_polled_votes: { 2024: 552.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "AJPK",
        "IND",
        "AMK",
        "IND",
        "IND",
        "BDP",
        "BSP",
        "IND",
        "IND",
        "PMTDK",
        "IND",
        "IND",
        "NIP",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        233.0, 174.0, 69.0, 54.0, 8.0, 3.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 11",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 243.0 },
    dmk_vote_share: { 2024: 39.45 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 11,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 243.0,
        total: 616.0,
        highest_vote: 243.0,
        vote_share: 39.45,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 11,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 130.0,
        total: 616.0,
        highest_vote: 243.0,
        vote_share: 21.1,
        margin: -113.0,
        margin_percentage: -18.34,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 11,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 117.0,
        total: 616.0,
        highest_vote: 243.0,
        vote_share: 18.99,
        margin: -126.0,
        margin_percentage: -20.45,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 195, "31-50": 356, "51-80": 253, "81+": 16 },
    total_polled_votes: { 2024: 616.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "PMTDK",
        "IND",
        "AJPK",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "IND",
        "BSP",
        "VTVTK",
        "IND",
        "IND",
        "AMK",
      ],
      y: [
        243.0, 130.0, 117.0, 109.0, 6.0, 3.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 12",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 334.0 },
    dmk_vote_share: { 2024: 44.95 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 12,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 334.0,
        total: 743.0,
        highest_vote: 334.0,
        vote_share: 44.95,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 12,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 174.0,
        total: 743.0,
        highest_vote: 334.0,
        vote_share: 23.42,
        margin: -160.0,
        margin_percentage: -21.53,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 12,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 121.0,
        total: 743.0,
        highest_vote: 334.0,
        vote_share: 16.29,
        margin: -213.0,
        margin_percentage: -28.67,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 223, "31-50": 460, "51-80": 410, "81+": 16 },
    total_polled_votes: { 2024: 743.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "IND",
        "BSP",
        "PMTDK",
        "IND",
        "IND",
        "BDP",
        "AJPK",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AMK",
        "IND",
        "NIP",
        "IND",
      ],
      y: [
        334.0, 174.0, 121.0, 83.0, 10.0, 5.0, 4.0, 4.0, 2.0, 2.0, 2.0, 1.0, 1.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 13",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 370.0 },
    dmk_vote_share: { 2024: 40.57 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 13,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 370.0,
        total: 912.0,
        highest_vote: 370.0,
        vote_share: 40.57,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 13,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 204.0,
        total: 912.0,
        highest_vote: 370.0,
        vote_share: 22.37,
        margin: -166.0,
        margin_percentage: -18.2,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 13,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 173.0,
        total: 912.0,
        highest_vote: 370.0,
        vote_share: 18.97,
        margin: -197.0,
        margin_percentage: -21.6,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 317, "31-50": 487, "51-80": 363, "81+": 9 },
    total_polled_votes: { 2024: 912.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "NTK",
        "BJP",
        "AIADMK",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AMK",
        "IND",
        "BSP",
        "PMTDK",
        "IND",
        "VTVTK",
        "IND",
        "NIP",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "AJPK",
      ],
      y: [
        370.0, 204.0, 173.0, 132.0, 9.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 14",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 212.0 },
    dmk_vote_share: { 2024: 37.46 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 14,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 212.0,
        total: 566.0,
        highest_vote: 212.0,
        vote_share: 37.46,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 14,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 148.0,
        total: 566.0,
        highest_vote: 212.0,
        vote_share: 26.15,
        margin: -64.0,
        margin_percentage: -11.31,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 14,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 109.0,
        total: 566.0,
        highest_vote: 212.0,
        vote_share: 19.26,
        margin: -103.0,
        margin_percentage: -18.2,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 170, "31-50": 306, "51-80": 269, "81+": 13 },
    total_polled_votes: { 2024: 566.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "NTK",
        "AIADMK",
        "BSP",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "IND",
        "IND",
        "AJPK",
        "VTVTK",
        "IND",
        "PMTDK",
        "IND",
        "AMK",
        "IND",
        "BDP",
        "IND",
      ],
      y: [
        212.0, 148.0, 109.0, 82.0, 5.0, 5.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 15",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 247.0 },
    dmk_vote_share: { 2024: 46.0 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 15,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 247.0,
        total: 537.0,
        highest_vote: 247.0,
        vote_share: 46.0,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 15,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 106.0,
        total: 537.0,
        highest_vote: 247.0,
        vote_share: 19.74,
        margin: -141.0,
        margin_percentage: -26.26,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 15,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 98.0,
        total: 537.0,
        highest_vote: 247.0,
        vote_share: 18.25,
        margin: -149.0,
        margin_percentage: -27.75,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 137, "31-50": 266, "51-80": 224, "81+": 3 },
    total_polled_votes: { 2024: 537.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "AIADMK",
        "BJP",
        "NTK",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "AMK",
        "PMTDK",
        "IND",
        "IND",
        "IND",
        "NIP",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "BSP",
        "AJPK",
        "VTVTK",
        "IND",
      ],
      y: [
        247.0, 106.0, 98.0, 70.0, 5.0, 3.0, 3.0, 2.0, 2.0, 1.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "ROBERT BRUCE, C.",
    hierarchy: { level: "PC", name: "Tirunelveli", num: "38" },
    margin_count: { 2024: 165062 },
    margin_percentage: { 2024: 15.56 },
    dmk_vote_count: { 2024: 499493 },
    dmk_vote_share: { 2024: 47.09 },
    top_n_candidate_info: {
      1: {
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 499493,
        total: 1060656,
        maxi: 499493,
        vote_share: 47.09,
        margin_count: 165062,
        margin_percentage: 15.56,
        pc_no: 38,
        name: "Tirunelveli",
        label: "ParliamentaryConstituency",
        rank: 1.0,
        image: "url",
      },
      2: {
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 334431,
        total: 1060656,
        maxi: 499493,
        vote_share: 31.53,
        margin_count: -165062,
        margin_percentage: -15.56,
        pc_no: 38,
        name: "Tirunelveli",
        label: "ParliamentaryConstituency",
        rank: 2.0,
        image: "url",
      },
      3: {
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 88996,
        total: 1060656,
        maxi: 499493,
        vote_share: 8.39,
        margin_count: -410497,
        margin_percentage: -38.7,
        pc_no: 38,
        name: "Tirunelveli",
        label: "ParliamentaryConstituency",
        rank: 3.0,
        image: "url",
      },
    },
    gender_stats: {
      male: 808127,
      female: 846225,
      others: 151,
      total: 1654503,
    },
    age_stats: {
      "18-30": 387599,
      "31-50": 691670,
      "51-80": 603438,
      "81+": 51677,
    },
    total_polled_votes: { 2024: 1060656 },
    pc_family_graph_data: {
      x: [
        "Dindigul",
        "Kancheepuram(SC)",
        "Theni",
        "Vellore",
        "Coimbatore",
        "Salem",
        "Erode",
        "Kallakurichi",
        "Tiruvannamalai",
        "Kanniyakumari",
        "Tiruchirappalli",
        "Karur",
        "Mayiladuthurai",
        "Chennai South",
        "Ramanathapuram",
        "Perambalur",
        "Chidambaram(SC)",
        "Tirunelveli",
        "Thanjavur",
        "Arani",
        "Chennai North",
        "Krishnagiri",
        "Viluppuram(SC)",
        "Nilgiris(SC)",
        "Tiruppur",
        "Nagapattinam(SC)",
        "Namakkal",
        "Pollachi",
        "Dharmapuri",
        "Sivaganga",
        "Tenkasi(SC)",
        "Virudhunagar",
        "Chennai Central",
      ],
      y: [
        667391, 582978, 569110, 566435, 565428, 562022, 558849, 558346, 543857,
        540267, 538877, 531829, 516534, 515307, 506690, 505348, 501851, 499493,
        498822, 497083, 495733, 491131, 474230, 470729, 470195, 462759, 457695,
        439166, 429301, 425631, 423025, 382876, 358637,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "IND",
        "NOTA",
        "IND",
        "BSP",
        "IND",
        "IND",
        "IND",
        "AJPK",
        "IND",
        "VTVTK",
        "BDP",
        "PMTDK",
        "AMK",
        "IND",
        "IND",
        "NIP",
        "IND",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        499493, 334431, 88996, 86918, 19802, 7285, 3744, 2044, 1888, 1829, 1493,
        1457, 1441, 1409, 1317, 1057, 1046, 913, 855, 790, 777, 685, 622, 364,
      ],
    },
    drilldown_data: {
      x: [
        "Palayamkottai",
        "Alangulam",
        "Tirunelveli",
        "Nanguneri",
        "Ambasamudram",
        "Radhapuram",
      ],
      y: [31.4, 14.69, 10.38, 13.71, 13.25, 12.14],
      x_axis_label: "Assembly Constituency",
      y_axis_label: "Margin Percentage",
    },
    total_electors: { 2024: 1654503 },
    lb_stats: {
      Town: 20,
      union: 14,
      Corporation: 2,
      Municipality: 4,
      "Total Local Bodies": 40,
      "Party Wards": 258,
    },
    booth_count: 1810,
  },
  {
    hierarchy: {
      level: "AC",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223)",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "ROBERT BRUCE, C.",
    margin_count: { 2024: 28058 },
    margin_percentage: { 2024: 14.69 },
    dmk_vote_count: { 2024: 84694 },
    dmk_vote_share: { 2024: 44.35 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 84694,
        total: 190971,
        maxi: 84694,
        margin_count: 28058,
        margin_percentage: 14.69,
        vote_share: 44.35,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 56636,
        total: 190971,
        maxi: 84694,
        margin_count: -28058,
        margin_percentage: -14.69,
        vote_share: 29.66,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 22339,
        total: 190971,
        maxi: 84694,
        margin_count: -62355,
        margin_percentage: -32.65,
        vote_share: 11.7,
        rank: 3.0,
        image: "url",
      },
    },
    gender_stats: {
      male: 127362,
      female: 133922,
      others: 20,
      total: 261304,
    },
    age_stats: {
      "18-30": 69378,
      "31-50": 114204,
      "51-80": 94091,
      "81+": 12015,
    },
    total_polled_votes: { 2024: 190971 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "BSP",
        "IND",
        "AJPK",
        "BDP",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
        "AMK",
        "PMTDK",
        "IND",
        "NIP",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        84694, 56636, 22339, 20382, 1562, 1312, 431, 376, 368, 353, 295, 273,
        232, 229, 229, 196, 174, 174, 166, 147, 109, 107, 104, 83,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
    drilldown_data: {
      x: [
        "\u0b95\u0b9f\u0bc8\u0baf\u0bae\u0bcd \u0bb5\u0b9f\u0b95\u0bcd\u0b95\u0bc1",
        "\u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0b95\u0bcd\u0b95\u0bc1\u0b9f\u0bbf",
        "\u0b95\u0b9f\u0bc8\u0baf\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1",
        "\u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1",
        "\u0b95\u0bc0\u0bb4\u0baa\u0bcd\u0baa\u0bbe\u0bb5\u0bc2\u0bb0\u0bcd \u0b95\u0bbf\u0bb4\u0b95\u0bcd\u0b95\u0bc1",
        "\u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0baa\u0bc7\u0bb0\u0bc2\u0bb0\u0bcd",
        "\u0b95\u0bc0\u0bb4\u0baa\u0bcd\u0baa\u0bbe\u0bb5\u0bc2\u0bb0\u0bcd \u0baa\u0bc7\u0bb0\u0bc2\u0bb0\u0bcd",
        "\u0bae\u0bc1\u0b95\u0bcd\u0b95\u0bc2\u0b9f\u0bb2\u0bcd \u0baa\u0bc7\u0bb0\u0bc2\u0bb0\u0bcd",
        "\u0b86\u0bb4\u0bcd\u0bb5\u0bbe\u0bb0\u0bcd \u0b95\u0bc1\u0bb1\u0bbf\u0b9a\u0bcd\u0b9a\u0bbf \u0baa\u0bc7\u0bb0\u0bc2\u0bb0\u0bcd",
      ],
      y: [
        15467.0, 14802.0, 13381.0, 11693.0, 9474.0, 5763.0, 5677.0, 3043.0,
        2946.0,
      ],
      x_axis_label: "Local Body",
      y_axis_label: "Votes",
    },
    total_electors: { 2024: 261304 },
    lb_stats: {
      Town: 4,
      union: 4,
      Corporation: 0,
      Municipality: 0,
      "Total Local Bodies": 8,
      "Party Wards": 25,
    },
    booth_count: 320,
  },
  {
    hierarchy: {
      level: "LB",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 2186.0 },
    margin_percentage: { 2024: 7.31 },
    dmk_vote_count: { 2024: 11693.0 },
    dmk_vote_share: { 2024: 39.12 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 11693.0,
        total: 29888.0,
        highest_vote: 11693.0,
        vote_share: 39.12,
        margin: 2186.0,
        margin_percentage: 7.31,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 9507.0,
        total: 29888.0,
        highest_vote: 11693.0,
        vote_share: 31.81,
        margin: -2186.0,
        margin_percentage: -7.31,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 3924.0,
        total: 29888.0,
        highest_vote: 11693.0,
        vote_share: 13.13,
        margin: -7769.0,
        margin_percentage: -25.99,
        rank: 3.0,
        image: "url",
      },
    },
    total_polled_votes: { 2024: 29888.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "NTK",
        "AIADMK",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "BSP",
        "BDP",
        "IND",
        "AJPK",
        "IND",
        "IND",
        "IND",
        "VTVTK",
        "AMK",
        "IND",
        "PMTDK",
        "IND",
        "NIP",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        11693.0, 9507.0, 3924.0, 3381.0, 260.0, 240.0, 118.0, 84.0, 77.0, 74.0,
        62.0, 61.0, 43.0, 43.0, 43.0, 42.0, 41.0, 37.0, 35.0, 31.0, 25.0, 23.0,
        23.0, 21.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
    drilldown_data: {
      x: [
        "\u0b9a\u0bc1\u0baa\u0bcd\u0baa\u0bc8\u0baf\u0bbe\u0baa\u0bc1\u0bb0\u0bae\u0bcd",
        "\u0ba8\u0bbe\u0bb0\u0ba3\u0baa\u0bc1\u0bb0\u0bae\u0bcd",
        "\u0bae\u0bbe\u0baf\u0bae\u0bbe\u0ba9\u0bcd\u0b95\u0bc1\u0bb0\u0bbf\u0b9a\u0bcd\u0b9a\u0bbf",
        "\u0b9a\u0bbf\u0bb5\u0bb2\u0bbe\u0bb0\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd",
        "\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd",
        "\u0bae\u0bbe\u0bb1\u0bbe\u0ba8\u0bcd\u0ba4\u0bc8",
        "\u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0ba9\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd",
        "\u0b95\u0b9f\u0b99\u0bcd\u0b95\u0ba8\u0bc7\u0bb0\u0bbf",
        "\u0ba8\u0bc6\u0b9f\u0bcd\u0b9f\u0bc2\u0bb0\u0bcd",
        "\u0b95\u0bbe\u0b9f\u0bc1\u0bb5\u0bc6\u0b9f\u0bcd\u0b9f\u0bbf",
        "\u0b95\u0bbe\u0bb5\u0bb2\u0bbe\u0b95\u0bc1\u0bb1\u0bbf\u0b9a\u0bcd\u0b9a\u0bbf",
        "\u0b85\u0baf\u0bcd\u0baf\u0ba9\u0bb0\u0bb0\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd",
        "\u0b95\u0bbf\u0b9f\u0bbe\u0bb0\u0b95\u0bc1\u0bb3\u0bae\u0bcd",
      ],
      y: [
        42.73, 25.54, 22.48, 16.59, 15.83, 13.09, 8.61, 2.68, 2.66, -10.58,
        -15.64, -19.67, -26.06,
      ],
      x_label: "Ward/VP",
      y_label: "Margin Percentage",
    },
    booth_count: 56,
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 1",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -178.0 },
    margin_percentage: { 2024: -27.73 },
    dmk_vote_count: { 2024: 194.0 },
    dmk_vote_share: { 2024: 30.22 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 1,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 372.0,
        total: 642.0,
        highest_vote: 372.0,
        vote_share: 57.94,
        margin: 178.0,
        margin_percentage: 27.73,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 1,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 194.0,
        total: 642.0,
        highest_vote: 372.0,
        vote_share: 30.22,
        margin: -178.0,
        margin_percentage: -27.73,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 1,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 33.0,
        total: 642.0,
        highest_vote: 372.0,
        vote_share: 5.14,
        margin: -339.0,
        margin_percentage: -52.8,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 197, "31-50": 358, "51-80": 290, "81+": 5 },
    total_polled_votes: { 2024: 642.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "AJPK",
        "IND",
        "IND",
        "VTVTK",
        "IND",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "BSP",
        "IND",
        "IND",
        "PMTDK",
        "IND",
        "NIP",
        "AMK",
        "IND",
      ],
      y: [
        372.0, 194.0, 33.0, 29.0, 4.0, 3.0, 2.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 2",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -94.0 },
    margin_percentage: { 2024: -16.26 },
    dmk_vote_count: { 2024: 196.0 },
    dmk_vote_share: { 2024: 33.91 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 2,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 290.0,
        total: 578.0,
        highest_vote: 290.0,
        vote_share: 50.17,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 2,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 196.0,
        total: 578.0,
        highest_vote: 290.0,
        vote_share: 33.91,
        margin: -94.0,
        margin_percentage: -16.26,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 2,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 43.0,
        total: 578.0,
        highest_vote: 290.0,
        vote_share: 7.44,
        margin: -247.0,
        margin_percentage: -42.73,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 195, "31-50": 342, "51-80": 374, "81+": 16 },
    total_polled_votes: { 2024: 578.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "NTK",
        "AIADMK",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AMK",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "PMTDK",
        "IND",
        "NIP",
        "IND",
        "BSP",
        "AJPK",
        "VTVTK",
        "IND",
      ],
      y: [
        290.0, 196.0, 43.0, 32.0, 8.0, 4.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 3",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 185.0 },
    dmk_vote_share: { 2024: 46.6 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 3,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 185.0,
        total: 397.0,
        highest_vote: 185.0,
        vote_share: 46.6,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 3,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 125.0,
        total: 397.0,
        highest_vote: 185.0,
        vote_share: 31.49,
        margin: -60.0,
        margin_percentage: -15.11,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 3,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 36.0,
        total: 397.0,
        highest_vote: 185.0,
        vote_share: 9.07,
        margin: -149.0,
        margin_percentage: -37.53,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 105, "31-50": 221, "51-80": 222, "81+": 4 },
    total_polled_votes: { 2024: 397.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "NTK",
        "AIADMK",
        "NOTA",
        "IND",
        "BSP",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AJPK",
        "VTVTK",
        "PMTDK",
        "IND",
        "AMK",
        "IND",
        "IND",
        "IND",
        "BDP",
        "IND",
        "NIP",
      ],
      y: [
        185.0, 125.0, 36.0, 28.0, 7.0, 4.0, 3.0, 3.0, 3.0, 1.0, 1.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 4",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -40.0 },
    margin_percentage: { 2024: -18.52 },
    dmk_vote_count: { 2024: 67.0 },
    dmk_vote_share: { 2024: 31.02 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 4,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 107.0,
        total: 216.0,
        highest_vote: 107.0,
        vote_share: 49.54,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 4,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 67.0,
        total: 216.0,
        highest_vote: 107.0,
        vote_share: 31.02,
        margin: -40.0,
        margin_percentage: -18.52,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 4,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 21.0,
        total: 216.0,
        highest_vote: 107.0,
        vote_share: 9.72,
        margin: -86.0,
        margin_percentage: -39.81,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 64, "31-50": 136, "51-80": 123, "81+": 5 },
    total_polled_votes: { 2024: 216.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "IND",
        "BSP",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "PMTDK",
        "IND",
        "AMK",
        "AJPK",
        "VTVTK",
        "IND",
        "IND",
      ],
      y: [
        107.0, 67.0, 21.0, 5.0, 4.0, 4.0, 3.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 5",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 353.0 },
    dmk_vote_share: { 2024: 47.51 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 5,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 353.0,
        total: 743.0,
        highest_vote: 353.0,
        vote_share: 47.51,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 5,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 170.0,
        total: 743.0,
        highest_vote: 353.0,
        vote_share: 22.88,
        margin: -183.0,
        margin_percentage: -24.63,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 5,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 138.0,
        total: 743.0,
        highest_vote: 353.0,
        vote_share: 18.57,
        margin: -215.0,
        margin_percentage: -28.94,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 208, "31-50": 407, "51-80": 316, "81+": 7 },
    total_polled_votes: { 2024: 743.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "AIADMK",
        "BJP",
        "NTK",
        "NOTA",
        "BSP",
        "AJPK",
        "IND",
        "IND",
        "IND",
        "AMK",
        "IND",
        "IND",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "PMTDK",
        "IND",
        "IND",
        "VTVTK",
      ],
      y: [
        353.0, 170.0, 138.0, 52.0, 6.0, 4.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 6",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -50.0 },
    margin_percentage: { 2024: -10.66 },
    dmk_vote_count: { 2024: 171.0 },
    dmk_vote_share: { 2024: 36.46 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 6,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 221.0,
        total: 469.0,
        highest_vote: 221.0,
        vote_share: 47.12,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 6,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 171.0,
        total: 469.0,
        highest_vote: 221.0,
        vote_share: 36.46,
        margin: -50.0,
        margin_percentage: -10.66,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 6,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 35.0,
        total: 469.0,
        highest_vote: 221.0,
        vote_share: 7.46,
        margin: -186.0,
        margin_percentage: -39.66,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 145, "31-50": 234, "51-80": 226, "81+": 6 },
    total_polled_votes: { 2024: 469.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "NTK",
        "AIADMK",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AJPK",
        "PMTDK",
        "IND",
        "AMK",
        "IND",
        "NIP",
        "VTVTK",
        "IND",
        "IND",
        "BSP",
        "IND",
        "BDP",
        "IND",
        "IND",
      ],
      y: [
        221.0, 171.0, 35.0, 17.0, 9.0, 5.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 7",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 347.0 },
    dmk_vote_share: { 2024: 41.96 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 7,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 347.0,
        total: 827.0,
        highest_vote: 347.0,
        vote_share: 41.96,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 7,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 153.0,
        total: 827.0,
        highest_vote: 347.0,
        vote_share: 18.5,
        margin: -194.0,
        margin_percentage: -23.46,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 7,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 149.0,
        total: 827.0,
        highest_vote: 347.0,
        vote_share: 18.02,
        margin: -198.0,
        margin_percentage: -23.94,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 270, "31-50": 470, "51-80": 406, "81+": 7 },
    total_polled_votes: { 2024: 827.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "BSP",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "AJPK",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "AMK",
        "PMTDK",
      ],
      y: [
        347.0, 153.0, 149.0, 142.0, 8.0, 5.0, 4.0, 3.0, 3.0, 2.0, 2.0, 2.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 8",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -22.0 },
    margin_percentage: { 2024: -3.83 },
    dmk_vote_count: { 2024: 211.0 },
    dmk_vote_share: { 2024: 36.76 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 8,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 233.0,
        total: 574.0,
        highest_vote: 233.0,
        vote_share: 40.59,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 8,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 211.0,
        total: 574.0,
        highest_vote: 233.0,
        vote_share: 36.76,
        margin: -22.0,
        margin_percentage: -3.83,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 8,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 51.0,
        total: 574.0,
        highest_vote: 233.0,
        vote_share: 8.89,
        margin: -182.0,
        margin_percentage: -31.71,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 169, "31-50": 337, "51-80": 357, "81+": 10 },
    total_polled_votes: { 2024: 574.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "NTK",
        "AIADMK",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "AMK",
        "NIP",
        "IND",
        "IND",
        "IND",
        "BDP",
        "IND",
        "IND",
        "PMTDK",
        "IND",
        "IND",
        "IND",
        "BSP",
        "AJPK",
        "VTVTK",
        "IND",
      ],
      y: [
        233.0, 211.0, 51.0, 43.0, 22.0, 5.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 9",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -93.0 },
    margin_percentage: { 2024: -17.19 },
    dmk_vote_count: { 2024: 159.0 },
    dmk_vote_share: { 2024: 29.39 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 9,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 252.0,
        total: 541.0,
        highest_vote: 252.0,
        vote_share: 46.58,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 9,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 159.0,
        total: 541.0,
        highest_vote: 252.0,
        vote_share: 29.39,
        margin: -93.0,
        margin_percentage: -17.19,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 9,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 57.0,
        total: 541.0,
        highest_vote: 252.0,
        vote_share: 10.54,
        margin: -195.0,
        margin_percentage: -36.04,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 185, "31-50": 374, "51-80": 290, "81+": 7 },
    total_polled_votes: { 2024: 541.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "AIADMK",
        "NTK",
        "IND",
        "NOTA",
        "AJPK",
        "IND",
        "BDP",
        "BSP",
        "PMTDK",
        "IND",
        "AMK",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        252.0, 159.0, 57.0, 51.0, 9.0, 4.0, 3.0, 2.0, 2.0, 1.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 10",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -59.0 },
    margin_percentage: { 2024: -10.69 },
    dmk_vote_count: { 2024: 174.0 },
    dmk_vote_share: { 2024: 31.52 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 10,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 233.0,
        total: 552.0,
        highest_vote: 233.0,
        vote_share: 42.21,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 10,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 174.0,
        total: 552.0,
        highest_vote: 233.0,
        vote_share: 31.52,
        margin: -59.0,
        margin_percentage: -10.69,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 10,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 69.0,
        total: 552.0,
        highest_vote: 233.0,
        vote_share: 12.5,
        margin: -164.0,
        margin_percentage: -29.71,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 150, "31-50": 341, "51-80": 281, "81+": 10 },
    total_polled_votes: { 2024: 552.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "AJPK",
        "IND",
        "AMK",
        "IND",
        "IND",
        "BDP",
        "BSP",
        "IND",
        "IND",
        "PMTDK",
        "IND",
        "IND",
        "NIP",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        233.0, 174.0, 69.0, 54.0, 8.0, 3.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 11",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 243.0 },
    dmk_vote_share: { 2024: 39.45 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 11,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 243.0,
        total: 616.0,
        highest_vote: 243.0,
        vote_share: 39.45,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 11,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 130.0,
        total: 616.0,
        highest_vote: 243.0,
        vote_share: 21.1,
        margin: -113.0,
        margin_percentage: -18.34,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 11,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 117.0,
        total: 616.0,
        highest_vote: 243.0,
        vote_share: 18.99,
        margin: -126.0,
        margin_percentage: -20.45,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 195, "31-50": 356, "51-80": 253, "81+": 16 },
    total_polled_votes: { 2024: 616.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "PMTDK",
        "IND",
        "AJPK",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "IND",
        "BSP",
        "VTVTK",
        "IND",
        "IND",
        "AMK",
      ],
      y: [
        243.0, 130.0, 117.0, 109.0, 6.0, 3.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 12",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 334.0 },
    dmk_vote_share: { 2024: 44.95 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 12,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 334.0,
        total: 743.0,
        highest_vote: 334.0,
        vote_share: 44.95,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 12,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 174.0,
        total: 743.0,
        highest_vote: 334.0,
        vote_share: 23.42,
        margin: -160.0,
        margin_percentage: -21.53,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 12,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 121.0,
        total: 743.0,
        highest_vote: 334.0,
        vote_share: 16.29,
        margin: -213.0,
        margin_percentage: -28.67,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 223, "31-50": 460, "51-80": 410, "81+": 16 },
    total_polled_votes: { 2024: 743.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "IND",
        "BSP",
        "PMTDK",
        "IND",
        "IND",
        "BDP",
        "AJPK",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AMK",
        "IND",
        "NIP",
        "IND",
      ],
      y: [
        334.0, 174.0, 121.0, 83.0, 10.0, 5.0, 4.0, 4.0, 2.0, 2.0, 2.0, 1.0, 1.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 13",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 370.0 },
    dmk_vote_share: { 2024: 40.57 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 13,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 370.0,
        total: 912.0,
        highest_vote: 370.0,
        vote_share: 40.57,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 13,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 204.0,
        total: 912.0,
        highest_vote: 370.0,
        vote_share: 22.37,
        margin: -166.0,
        margin_percentage: -18.2,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 13,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 173.0,
        total: 912.0,
        highest_vote: 370.0,
        vote_share: 18.97,
        margin: -197.0,
        margin_percentage: -21.6,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 317, "31-50": 487, "51-80": 363, "81+": 9 },
    total_polled_votes: { 2024: 912.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "NTK",
        "BJP",
        "AIADMK",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AMK",
        "IND",
        "BSP",
        "PMTDK",
        "IND",
        "VTVTK",
        "IND",
        "NIP",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "AJPK",
      ],
      y: [
        370.0, 204.0, 173.0, 132.0, 9.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 14",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 212.0 },
    dmk_vote_share: { 2024: 37.46 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 14,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 212.0,
        total: 566.0,
        highest_vote: 212.0,
        vote_share: 37.46,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 14,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 148.0,
        total: 566.0,
        highest_vote: 212.0,
        vote_share: 26.15,
        margin: -64.0,
        margin_percentage: -11.31,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 14,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 109.0,
        total: 566.0,
        highest_vote: 212.0,
        vote_share: 19.26,
        margin: -103.0,
        margin_percentage: -18.2,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 170, "31-50": 306, "51-80": 269, "81+": 13 },
    total_polled_votes: { 2024: 566.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "NTK",
        "AIADMK",
        "BSP",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "IND",
        "IND",
        "AJPK",
        "VTVTK",
        "IND",
        "PMTDK",
        "IND",
        "AMK",
        "IND",
        "BDP",
        "IND",
      ],
      y: [
        212.0, 148.0, 109.0, 82.0, 5.0, 5.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 15",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 247.0 },
    dmk_vote_share: { 2024: 46.0 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 15,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 247.0,
        total: 537.0,
        highest_vote: 247.0,
        vote_share: 46.0,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 15,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 106.0,
        total: 537.0,
        highest_vote: 247.0,
        vote_share: 19.74,
        margin: -141.0,
        margin_percentage: -26.26,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 15,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 98.0,
        total: 537.0,
        highest_vote: 247.0,
        vote_share: 18.25,
        margin: -149.0,
        margin_percentage: -27.75,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 137, "31-50": 266, "51-80": 224, "81+": 3 },
    total_polled_votes: { 2024: 537.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "AIADMK",
        "BJP",
        "NTK",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "AMK",
        "PMTDK",
        "IND",
        "IND",
        "IND",
        "NIP",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "BSP",
        "AJPK",
        "VTVTK",
        "IND",
      ],
      y: [
        247.0, 106.0, 98.0, 70.0, 5.0, 3.0, 3.0, 2.0, 2.0, 1.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "ROBERT BRUCE, C.",
    hierarchy: { level: "PC", name: "Tirunelveli", num: "38" },
    margin_count: { 2024: 165062 },
    margin_percentage: { 2024: 15.56 },
    dmk_vote_count: { 2024: 499493 },
    dmk_vote_share: { 2024: 47.09 },
    top_n_candidate_info: {
      1: {
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 499493,
        total: 1060656,
        maxi: 499493,
        vote_share: 47.09,
        margin_count: 165062,
        margin_percentage: 15.56,
        pc_no: 38,
        name: "Tirunelveli",
        label: "ParliamentaryConstituency",
        rank: 1.0,
        image: "url",
      },
      2: {
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 334431,
        total: 1060656,
        maxi: 499493,
        vote_share: 31.53,
        margin_count: -165062,
        margin_percentage: -15.56,
        pc_no: 38,
        name: "Tirunelveli",
        label: "ParliamentaryConstituency",
        rank: 2.0,
        image: "url",
      },
      3: {
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 88996,
        total: 1060656,
        maxi: 499493,
        vote_share: 8.39,
        margin_count: -410497,
        margin_percentage: -38.7,
        pc_no: 38,
        name: "Tirunelveli",
        label: "ParliamentaryConstituency",
        rank: 3.0,
        image: "url",
      },
    },
    gender_stats: {
      male: 808127,
      female: 846225,
      others: 151,
      total: 1654503,
    },
    age_stats: {
      "18-30": 387599,
      "31-50": 691670,
      "51-80": 603438,
      "81+": 51677,
    },
    total_polled_votes: { 2024: 1060656 },
    pc_family_graph_data: {
      x: [
        "Dindigul",
        "Kancheepuram(SC)",
        "Theni",
        "Vellore",
        "Coimbatore",
        "Salem",
        "Erode",
        "Kallakurichi",
        "Tiruvannamalai",
        "Kanniyakumari",
        "Tiruchirappalli",
        "Karur",
        "Mayiladuthurai",
        "Chennai South",
        "Ramanathapuram",
        "Perambalur",
        "Chidambaram(SC)",
        "Tirunelveli",
        "Thanjavur",
        "Arani",
        "Chennai North",
        "Krishnagiri",
        "Viluppuram(SC)",
        "Nilgiris(SC)",
        "Tiruppur",
        "Nagapattinam(SC)",
        "Namakkal",
        "Pollachi",
        "Dharmapuri",
        "Sivaganga",
        "Tenkasi(SC)",
        "Virudhunagar",
        "Chennai Central",
      ],
      y: [
        667391, 582978, 569110, 566435, 565428, 562022, 558849, 558346, 543857,
        540267, 538877, 531829, 516534, 515307, 506690, 505348, 501851, 499493,
        498822, 497083, 495733, 491131, 474230, 470729, 470195, 462759, 457695,
        439166, 429301, 425631, 423025, 382876, 358637,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "IND",
        "NOTA",
        "IND",
        "BSP",
        "IND",
        "IND",
        "IND",
        "AJPK",
        "IND",
        "VTVTK",
        "BDP",
        "PMTDK",
        "AMK",
        "IND",
        "IND",
        "NIP",
        "IND",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        499493, 334431, 88996, 86918, 19802, 7285, 3744, 2044, 1888, 1829, 1493,
        1457, 1441, 1409, 1317, 1057, 1046, 913, 855, 790, 777, 685, 622, 364,
      ],
    },
    drilldown_data: {
      x: [
        "Palayamkottai",
        "Alangulam",
        "Tirunelveli",
        "Nanguneri",
        "Ambasamudram",
        "Radhapuram",
      ],
      y: [31.4, 14.69, 10.38, 13.71, 13.25, 12.14],
      x_axis_label: "Assembly Constituency",
      y_axis_label: "Margin Percentage",
    },
    total_electors: { 2024: 1654503 },
    lb_stats: {
      Town: 20,
      union: 14,
      Corporation: 2,
      Municipality: 4,
      "Total Local Bodies": 40,
      "Party Wards": 258,
    },
    booth_count: 1810,
  },
  {
    hierarchy: {
      level: "AC",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223)",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "ROBERT BRUCE, C.",
    margin_count: { 2024: 28058 },
    margin_percentage: { 2024: 14.69 },
    dmk_vote_count: { 2024: 84694 },
    dmk_vote_share: { 2024: 44.35 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 84694,
        total: 190971,
        maxi: 84694,
        margin_count: 28058,
        margin_percentage: 14.69,
        vote_share: 44.35,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 56636,
        total: 190971,
        maxi: 84694,
        margin_count: -28058,
        margin_percentage: -14.69,
        vote_share: 29.66,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 22339,
        total: 190971,
        maxi: 84694,
        margin_count: -62355,
        margin_percentage: -32.65,
        vote_share: 11.7,
        rank: 3.0,
        image: "url",
      },
    },
    gender_stats: {
      male: 127362,
      female: 133922,
      others: 20,
      total: 261304,
    },
    age_stats: {
      "18-30": 69378,
      "31-50": 114204,
      "51-80": 94091,
      "81+": 12015,
    },
    total_polled_votes: { 2024: 190971 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "BSP",
        "IND",
        "AJPK",
        "BDP",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
        "AMK",
        "PMTDK",
        "IND",
        "NIP",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        84694, 56636, 22339, 20382, 1562, 1312, 431, 376, 368, 353, 295, 273,
        232, 229, 229, 196, 174, 174, 166, 147, 109, 107, 104, 83,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
    drilldown_data: {
      x: [
        "\u0b95\u0b9f\u0bc8\u0baf\u0bae\u0bcd \u0bb5\u0b9f\u0b95\u0bcd\u0b95\u0bc1",
        "\u0baa\u0bbe\u0baa\u0bcd\u0baa\u0bbe\u0b95\u0bcd\u0b95\u0bc1\u0b9f\u0bbf",
        "\u0b95\u0b9f\u0bc8\u0baf\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1",
        "\u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1",
        "\u0b95\u0bc0\u0bb4\u0baa\u0bcd\u0baa\u0bbe\u0bb5\u0bc2\u0bb0\u0bcd \u0b95\u0bbf\u0bb4\u0b95\u0bcd\u0b95\u0bc1",
        "\u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0baa\u0bc7\u0bb0\u0bc2\u0bb0\u0bcd",
        "\u0b95\u0bc0\u0bb4\u0baa\u0bcd\u0baa\u0bbe\u0bb5\u0bc2\u0bb0\u0bcd \u0baa\u0bc7\u0bb0\u0bc2\u0bb0\u0bcd",
        "\u0bae\u0bc1\u0b95\u0bcd\u0b95\u0bc2\u0b9f\u0bb2\u0bcd \u0baa\u0bc7\u0bb0\u0bc2\u0bb0\u0bcd",
        "\u0b86\u0bb4\u0bcd\u0bb5\u0bbe\u0bb0\u0bcd \u0b95\u0bc1\u0bb1\u0bbf\u0b9a\u0bcd\u0b9a\u0bbf \u0baa\u0bc7\u0bb0\u0bc2\u0bb0\u0bcd",
      ],
      y: [
        15467.0, 14802.0, 13381.0, 11693.0, 9474.0, 5763.0, 5677.0, 3043.0,
        2946.0,
      ],
      x_axis_label: "Local Body",
      y_axis_label: "Votes",
    },
    total_electors: { 2024: 261304 },
    lb_stats: {
      Town: 4,
      union: 4,
      Corporation: 0,
      Municipality: 0,
      "Total Local Bodies": 8,
      "Party Wards": 25,
    },
    booth_count: 320,
  },
  {
    hierarchy: {
      level: "LB",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 2186.0 },
    margin_percentage: { 2024: 7.31 },
    dmk_vote_count: { 2024: 11693.0 },
    dmk_vote_share: { 2024: 39.12 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 11693.0,
        total: 29888.0,
        highest_vote: 11693.0,
        vote_share: 39.12,
        margin: 2186.0,
        margin_percentage: 7.31,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 9507.0,
        total: 29888.0,
        highest_vote: 11693.0,
        vote_share: 31.81,
        margin: -2186.0,
        margin_percentage: -7.31,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 3924.0,
        total: 29888.0,
        highest_vote: 11693.0,
        vote_share: 13.13,
        margin: -7769.0,
        margin_percentage: -25.99,
        rank: 3.0,
        image: "url",
      },
    },
    total_polled_votes: { 2024: 29888.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "NTK",
        "AIADMK",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "BSP",
        "BDP",
        "IND",
        "AJPK",
        "IND",
        "IND",
        "IND",
        "VTVTK",
        "AMK",
        "IND",
        "PMTDK",
        "IND",
        "NIP",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        11693.0, 9507.0, 3924.0, 3381.0, 260.0, 240.0, 118.0, 84.0, 77.0, 74.0,
        62.0, 61.0, 43.0, 43.0, 43.0, 42.0, 41.0, 37.0, 35.0, 31.0, 25.0, 23.0,
        23.0, 21.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
    drilldown_data: {
      x: [
        "\u0b9a\u0bc1\u0baa\u0bcd\u0baa\u0bc8\u0baf\u0bbe\u0baa\u0bc1\u0bb0\u0bae\u0bcd",
        "\u0ba8\u0bbe\u0bb0\u0ba3\u0baa\u0bc1\u0bb0\u0bae\u0bcd",
        "\u0bae\u0bbe\u0baf\u0bae\u0bbe\u0ba9\u0bcd\u0b95\u0bc1\u0bb0\u0bbf\u0b9a\u0bcd\u0b9a\u0bbf",
        "\u0b9a\u0bbf\u0bb5\u0bb2\u0bbe\u0bb0\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd",
        "\u0ba8\u0bb2\u0bcd\u0bb2\u0bc2\u0bb0\u0bcd",
        "\u0bae\u0bbe\u0bb1\u0bbe\u0ba8\u0bcd\u0ba4\u0bc8",
        "\u0b95\u0bc1\u0bb1\u0bbf\u0baa\u0bcd\u0baa\u0ba9\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd",
        "\u0b95\u0b9f\u0b99\u0bcd\u0b95\u0ba8\u0bc7\u0bb0\u0bbf",
        "\u0ba8\u0bc6\u0b9f\u0bcd\u0b9f\u0bc2\u0bb0\u0bcd",
        "\u0b95\u0bbe\u0b9f\u0bc1\u0bb5\u0bc6\u0b9f\u0bcd\u0b9f\u0bbf",
        "\u0b95\u0bbe\u0bb5\u0bb2\u0bbe\u0b95\u0bc1\u0bb1\u0bbf\u0b9a\u0bcd\u0b9a\u0bbf",
        "\u0b85\u0baf\u0bcd\u0baf\u0ba9\u0bb0\u0bb0\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd",
        "\u0b95\u0bbf\u0b9f\u0bbe\u0bb0\u0b95\u0bc1\u0bb3\u0bae\u0bcd",
      ],
      y: [
        42.73, 25.54, 22.48, 16.59, 15.83, 13.09, 8.61, 2.68, 2.66, -10.58,
        -15.64, -19.67, -26.06,
      ],
      x_label: "Ward/VP",
      y_label: "Margin Percentage",
    },
    booth_count: 56,
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 1",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -178.0 },
    margin_percentage: { 2024: -27.73 },
    dmk_vote_count: { 2024: 194.0 },
    dmk_vote_share: { 2024: 30.22 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 1,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 372.0,
        total: 642.0,
        highest_vote: 372.0,
        vote_share: 57.94,
        margin: 178.0,
        margin_percentage: 27.73,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 1,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 194.0,
        total: 642.0,
        highest_vote: 372.0,
        vote_share: 30.22,
        margin: -178.0,
        margin_percentage: -27.73,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 1,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 33.0,
        total: 642.0,
        highest_vote: 372.0,
        vote_share: 5.14,
        margin: -339.0,
        margin_percentage: -52.8,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 197, "31-50": 358, "51-80": 290, "81+": 5 },
    total_polled_votes: { 2024: 642.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "AJPK",
        "IND",
        "IND",
        "VTVTK",
        "IND",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "BSP",
        "IND",
        "IND",
        "PMTDK",
        "IND",
        "NIP",
        "AMK",
        "IND",
      ],
      y: [
        372.0, 194.0, 33.0, 29.0, 4.0, 3.0, 2.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 2",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -94.0 },
    margin_percentage: { 2024: -16.26 },
    dmk_vote_count: { 2024: 196.0 },
    dmk_vote_share: { 2024: 33.91 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 2,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 290.0,
        total: 578.0,
        highest_vote: 290.0,
        vote_share: 50.17,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 2,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 196.0,
        total: 578.0,
        highest_vote: 290.0,
        vote_share: 33.91,
        margin: -94.0,
        margin_percentage: -16.26,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 2,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 43.0,
        total: 578.0,
        highest_vote: 290.0,
        vote_share: 7.44,
        margin: -247.0,
        margin_percentage: -42.73,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 195, "31-50": 342, "51-80": 374, "81+": 16 },
    total_polled_votes: { 2024: 578.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "NTK",
        "AIADMK",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AMK",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "PMTDK",
        "IND",
        "NIP",
        "IND",
        "BSP",
        "AJPK",
        "VTVTK",
        "IND",
      ],
      y: [
        290.0, 196.0, 43.0, 32.0, 8.0, 4.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 3",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 185.0 },
    dmk_vote_share: { 2024: 46.6 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 3,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 185.0,
        total: 397.0,
        highest_vote: 185.0,
        vote_share: 46.6,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 3,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 125.0,
        total: 397.0,
        highest_vote: 185.0,
        vote_share: 31.49,
        margin: -60.0,
        margin_percentage: -15.11,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 3,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 36.0,
        total: 397.0,
        highest_vote: 185.0,
        vote_share: 9.07,
        margin: -149.0,
        margin_percentage: -37.53,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 105, "31-50": 221, "51-80": 222, "81+": 4 },
    total_polled_votes: { 2024: 397.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "NTK",
        "AIADMK",
        "NOTA",
        "IND",
        "BSP",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AJPK",
        "VTVTK",
        "PMTDK",
        "IND",
        "AMK",
        "IND",
        "IND",
        "IND",
        "BDP",
        "IND",
        "NIP",
      ],
      y: [
        185.0, 125.0, 36.0, 28.0, 7.0, 4.0, 3.0, 3.0, 3.0, 1.0, 1.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 4",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -40.0 },
    margin_percentage: { 2024: -18.52 },
    dmk_vote_count: { 2024: 67.0 },
    dmk_vote_share: { 2024: 31.02 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 4,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 107.0,
        total: 216.0,
        highest_vote: 107.0,
        vote_share: 49.54,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 4,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 67.0,
        total: 216.0,
        highest_vote: 107.0,
        vote_share: 31.02,
        margin: -40.0,
        margin_percentage: -18.52,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 4,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 21.0,
        total: 216.0,
        highest_vote: 107.0,
        vote_share: 9.72,
        margin: -86.0,
        margin_percentage: -39.81,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 64, "31-50": 136, "51-80": 123, "81+": 5 },
    total_polled_votes: { 2024: 216.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "IND",
        "BSP",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "PMTDK",
        "IND",
        "AMK",
        "AJPK",
        "VTVTK",
        "IND",
        "IND",
      ],
      y: [
        107.0, 67.0, 21.0, 5.0, 4.0, 4.0, 3.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 5",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 353.0 },
    dmk_vote_share: { 2024: 47.51 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 5,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 353.0,
        total: 743.0,
        highest_vote: 353.0,
        vote_share: 47.51,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 5,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 170.0,
        total: 743.0,
        highest_vote: 353.0,
        vote_share: 22.88,
        margin: -183.0,
        margin_percentage: -24.63,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 5,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 138.0,
        total: 743.0,
        highest_vote: 353.0,
        vote_share: 18.57,
        margin: -215.0,
        margin_percentage: -28.94,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 208, "31-50": 407, "51-80": 316, "81+": 7 },
    total_polled_votes: { 2024: 743.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "AIADMK",
        "BJP",
        "NTK",
        "NOTA",
        "BSP",
        "AJPK",
        "IND",
        "IND",
        "IND",
        "AMK",
        "IND",
        "IND",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "PMTDK",
        "IND",
        "IND",
        "VTVTK",
      ],
      y: [
        353.0, 170.0, 138.0, 52.0, 6.0, 4.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0,
        1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 6",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -50.0 },
    margin_percentage: { 2024: -10.66 },
    dmk_vote_count: { 2024: 171.0 },
    dmk_vote_share: { 2024: 36.46 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 6,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 221.0,
        total: 469.0,
        highest_vote: 221.0,
        vote_share: 47.12,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 6,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 171.0,
        total: 469.0,
        highest_vote: 221.0,
        vote_share: 36.46,
        margin: -50.0,
        margin_percentage: -10.66,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 6,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 35.0,
        total: 469.0,
        highest_vote: 221.0,
        vote_share: 7.46,
        margin: -186.0,
        margin_percentage: -39.66,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 145, "31-50": 234, "51-80": 226, "81+": 6 },
    total_polled_votes: { 2024: 469.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "NTK",
        "AIADMK",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AJPK",
        "PMTDK",
        "IND",
        "AMK",
        "IND",
        "NIP",
        "VTVTK",
        "IND",
        "IND",
        "BSP",
        "IND",
        "BDP",
        "IND",
        "IND",
      ],
      y: [
        221.0, 171.0, 35.0, 17.0, 9.0, 5.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 7",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 347.0 },
    dmk_vote_share: { 2024: 41.96 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 7,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 347.0,
        total: 827.0,
        highest_vote: 347.0,
        vote_share: 41.96,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 7,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 153.0,
        total: 827.0,
        highest_vote: 347.0,
        vote_share: 18.5,
        margin: -194.0,
        margin_percentage: -23.46,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 7,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 149.0,
        total: 827.0,
        highest_vote: 347.0,
        vote_share: 18.02,
        margin: -198.0,
        margin_percentage: -23.94,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 270, "31-50": 470, "51-80": 406, "81+": 7 },
    total_polled_votes: { 2024: 827.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "BSP",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "AJPK",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "AMK",
        "PMTDK",
      ],
      y: [
        347.0, 153.0, 149.0, 142.0, 8.0, 5.0, 4.0, 3.0, 3.0, 2.0, 2.0, 2.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 8",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -22.0 },
    margin_percentage: { 2024: -3.83 },
    dmk_vote_count: { 2024: 211.0 },
    dmk_vote_share: { 2024: 36.76 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 8,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 233.0,
        total: 574.0,
        highest_vote: 233.0,
        vote_share: 40.59,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 8,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 211.0,
        total: 574.0,
        highest_vote: 233.0,
        vote_share: 36.76,
        margin: -22.0,
        margin_percentage: -3.83,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 8,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 51.0,
        total: 574.0,
        highest_vote: 233.0,
        vote_share: 8.89,
        margin: -182.0,
        margin_percentage: -31.71,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 169, "31-50": 337, "51-80": 357, "81+": 10 },
    total_polled_votes: { 2024: 574.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "NTK",
        "AIADMK",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "AMK",
        "NIP",
        "IND",
        "IND",
        "IND",
        "BDP",
        "IND",
        "IND",
        "PMTDK",
        "IND",
        "IND",
        "IND",
        "BSP",
        "AJPK",
        "VTVTK",
        "IND",
      ],
      y: [
        233.0, 211.0, 51.0, 43.0, 22.0, 5.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 9",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -93.0 },
    margin_percentage: { 2024: -17.19 },
    dmk_vote_count: { 2024: 159.0 },
    dmk_vote_share: { 2024: 29.39 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 9,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 252.0,
        total: 541.0,
        highest_vote: 252.0,
        vote_share: 46.58,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 9,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 159.0,
        total: 541.0,
        highest_vote: 252.0,
        vote_share: 29.39,
        margin: -93.0,
        margin_percentage: -17.19,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 9,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 57.0,
        total: 541.0,
        highest_vote: 252.0,
        vote_share: 10.54,
        margin: -195.0,
        margin_percentage: -36.04,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 185, "31-50": 374, "51-80": 290, "81+": 7 },
    total_polled_votes: { 2024: 541.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "AIADMK",
        "NTK",
        "IND",
        "NOTA",
        "AJPK",
        "IND",
        "BDP",
        "BSP",
        "PMTDK",
        "IND",
        "AMK",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        252.0, 159.0, 57.0, 51.0, 9.0, 4.0, 3.0, 2.0, 2.0, 1.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 10",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: -59.0 },
    margin_percentage: { 2024: -10.69 },
    dmk_vote_count: { 2024: 174.0 },
    dmk_vote_share: { 2024: 31.52 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 10,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 233.0,
        total: 552.0,
        highest_vote: 233.0,
        vote_share: 42.21,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 10,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 174.0,
        total: 552.0,
        highest_vote: 233.0,
        vote_share: 31.52,
        margin: -59.0,
        margin_percentage: -10.69,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 10,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 69.0,
        total: 552.0,
        highest_vote: 233.0,
        vote_share: 12.5,
        margin: -164.0,
        margin_percentage: -29.71,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 150, "31-50": 341, "51-80": 281, "81+": 10 },
    total_polled_votes: { 2024: 552.0 },
    selected_level_graph_data: {
      x: [
        "BJP",
        "INC",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "AJPK",
        "IND",
        "AMK",
        "IND",
        "IND",
        "BDP",
        "BSP",
        "IND",
        "IND",
        "PMTDK",
        "IND",
        "IND",
        "NIP",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
      ],
      y: [
        233.0, 174.0, 69.0, 54.0, 8.0, 3.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 11",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 243.0 },
    dmk_vote_share: { 2024: 39.45 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 11,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 243.0,
        total: 616.0,
        highest_vote: 243.0,
        vote_share: 39.45,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 11,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 130.0,
        total: 616.0,
        highest_vote: 243.0,
        vote_share: 21.1,
        margin: -113.0,
        margin_percentage: -18.34,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 11,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 117.0,
        total: 616.0,
        highest_vote: 243.0,
        vote_share: 18.99,
        margin: -126.0,
        margin_percentage: -20.45,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 195, "31-50": 356, "51-80": 253, "81+": 16 },
    total_polled_votes: { 2024: 616.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "PMTDK",
        "IND",
        "AJPK",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "IND",
        "BSP",
        "VTVTK",
        "IND",
        "IND",
        "AMK",
      ],
      y: [
        243.0, 130.0, 117.0, 109.0, 6.0, 3.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 12",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 334.0 },
    dmk_vote_share: { 2024: 44.95 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 12,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 334.0,
        total: 743.0,
        highest_vote: 334.0,
        vote_share: 44.95,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 12,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 174.0,
        total: 743.0,
        highest_vote: 334.0,
        vote_share: 23.42,
        margin: -160.0,
        margin_percentage: -21.53,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 12,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 121.0,
        total: 743.0,
        highest_vote: 334.0,
        vote_share: 16.29,
        margin: -213.0,
        margin_percentage: -28.67,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 223, "31-50": 460, "51-80": 410, "81+": 16 },
    total_polled_votes: { 2024: 743.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "AIADMK",
        "NTK",
        "NOTA",
        "IND",
        "IND",
        "BSP",
        "PMTDK",
        "IND",
        "IND",
        "BDP",
        "AJPK",
        "VTVTK",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AMK",
        "IND",
        "NIP",
        "IND",
      ],
      y: [
        334.0, 174.0, 121.0, 83.0, 10.0, 5.0, 4.0, 4.0, 2.0, 2.0, 2.0, 1.0, 1.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 13",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 370.0 },
    dmk_vote_share: { 2024: 40.57 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 13,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 370.0,
        total: 912.0,
        highest_vote: 370.0,
        vote_share: 40.57,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 13,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 204.0,
        total: 912.0,
        highest_vote: 370.0,
        vote_share: 22.37,
        margin: -166.0,
        margin_percentage: -18.2,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 13,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 173.0,
        total: 912.0,
        highest_vote: 370.0,
        vote_share: 18.97,
        margin: -197.0,
        margin_percentage: -21.6,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 317, "31-50": 487, "51-80": 363, "81+": 9 },
    total_polled_votes: { 2024: 912.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "NTK",
        "BJP",
        "AIADMK",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "AMK",
        "IND",
        "BSP",
        "PMTDK",
        "IND",
        "VTVTK",
        "IND",
        "NIP",
        "IND",
        "BDP",
        "IND",
        "IND",
        "IND",
        "AJPK",
      ],
      y: [
        370.0, 204.0, 173.0, 132.0, 9.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 14",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 212.0 },
    dmk_vote_share: { 2024: 37.46 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 14,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 212.0,
        total: 566.0,
        highest_vote: 212.0,
        vote_share: 37.46,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 14,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 148.0,
        total: 566.0,
        highest_vote: 212.0,
        vote_share: 26.15,
        margin: -64.0,
        margin_percentage: -11.31,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 14,
        candidate_name: "SATHYA",
        party_name: "NTK",
        votes: 109.0,
        total: 566.0,
        highest_vote: 212.0,
        vote_share: 19.26,
        margin: -103.0,
        margin_percentage: -18.2,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 170, "31-50": 306, "51-80": 269, "81+": 13 },
    total_polled_votes: { 2024: 566.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "BJP",
        "NTK",
        "AIADMK",
        "BSP",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "IND",
        "NIP",
        "IND",
        "IND",
        "AJPK",
        "VTVTK",
        "IND",
        "PMTDK",
        "IND",
        "AMK",
        "IND",
        "BDP",
        "IND",
      ],
      y: [
        212.0, 148.0, 109.0, 82.0, 5.0, 5.0, 2.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
  {
    hierarchy: {
      level: "BOOTH",
      name: "PC : Tirunelveli (38) - AC : Alangulam (223) - LB : \u0b86\u0bb2\u0b99\u0bcd\u0b95\u0bc1\u0bb3\u0bae\u0bcd \u0ba4\u0bc6\u0bb1\u0bcd\u0b95\u0bc1 - Booth No: 15",
      num: "223",
    },
    district_secretary: "",
    party_district_secretary: "",
    in_charge_minister: "",
    member_of_parliament: "",
    margin_count: { 2024: 0.0 },
    margin_percentage: { 2024: 0.0 },
    dmk_vote_count: { 2024: 247.0 },
    dmk_vote_share: { 2024: 46.0 },
    top_n_candidate_info: {
      1: {
        ac_no: 223,
        booth_no: 15,
        candidate_name: "ROBERT BRUCE, C.",
        party_name: "INC",
        votes: 247.0,
        total: 537.0,
        highest_vote: 247.0,
        vote_share: 46.0,
        margin: 0.0,
        margin_percentage: 0.0,
        rank: 1.0,
        image: "url",
      },
      2: {
        ac_no: 223,
        booth_no: 15,
        candidate_name: "JANSI RANI, M.",
        party_name: "AIADMK",
        votes: 106.0,
        total: 537.0,
        highest_vote: 247.0,
        vote_share: 19.74,
        margin: -141.0,
        margin_percentage: -26.26,
        rank: 2.0,
        image: "url",
      },
      3: {
        ac_no: 223,
        booth_no: 15,
        candidate_name: "NAINAR NAGENTHRAN",
        party_name: "BJP",
        votes: 98.0,
        total: 537.0,
        highest_vote: 247.0,
        vote_share: 18.25,
        margin: -149.0,
        margin_percentage: -27.75,
        rank: 3.0,
        image: "url",
      },
    },
    age_stats: { "18-30": 137, "31-50": 266, "51-80": 224, "81+": 3 },
    total_polled_votes: { 2024: 537.0 },
    selected_level_graph_data: {
      x: [
        "INC",
        "AIADMK",
        "BJP",
        "NTK",
        "IND",
        "NOTA",
        "IND",
        "IND",
        "IND",
        "AMK",
        "PMTDK",
        "IND",
        "IND",
        "IND",
        "NIP",
        "BDP",
        "IND",
        "IND",
        "IND",
        "IND",
        "BSP",
        "AJPK",
        "VTVTK",
        "IND",
      ],
      y: [
        247.0, 106.0, 98.0, 70.0, 5.0, 3.0, 3.0, 2.0, 2.0, 1.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      x_label: "Party",
      y_label: "Votes",
    },
  },
];
const TOTAL_PDFS = originalData.length;
const NUM_WORKERS = os.cpus().length;
const PDFS_PER_WORKER = Math.ceil(TOTAL_PDFS / NUM_WORKERS);
const OUTPUT_DIR = path.join(__dirname, "output");
let mainContent = `${styles}${scripts}`;
if (isMainThread) {
  async function main() {
    const startTime = performance.now();

    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    const workers = [];
    for (let i = 0; i < NUM_WORKERS; i++) {
      const start = i * PDFS_PER_WORKER;
      const end = Math.min((i + 1) * PDFS_PER_WORKER, TOTAL_PDFS);

      const worker = new Worker(__filename, {
        workerData: { start, end },
      });
      workers.push(worker);
    }

    await Promise.all(
      workers.map(
        (worker) => new Promise((resolve) => worker.on("exit", resolve))
      )
    );

    await combinePDFs(0, TOTAL_PDFS);

    for (let i = 0; i < TOTAL_PDFS; i++) {
      await fs
        .unlink(path.join(OUTPUT_DIR, `page_${i}.pdf`))
        .catch(console.error);
    }

    const endTime = performance.now();
    const totalTimeSeconds = ((endTime - startTime) / 1000).toFixed(2);
    console.log(
      `All PDFs combined into a single file: ${path.join(
        OUTPUT_DIR,
        "combined.pdf"
      )}`
    );
    console.log(`Total time taken: ${totalTimeSeconds} seconds`);
  }

  main().catch(console.error);
} else {
  (async () => {
    console.log(`Generating PDF's for ${TOTAL_PDFS} records...`);
    const { start, end } = workerData;

    const browser = await puppeteer.launch({
      args: [
        "--use-gl=egl",
        "--enable-gpu-rasterization",
        "--disable-gpu-sandbox",
      ],
      headless: true,
      timeout: 120000,
    });
    const page = await browser.newPage();
    //#region  for loop
    for (let i = start; i < end; i++) {
      try {
        const html = generateChartHTML(i);
        await page.setContent(html);
        await page.pdf({
          path: path.join(OUTPUT_DIR, `page_${i}.pdf`),
          format: "A4",
          landscape: true,
          printBackground: true,
          timeout: 60000,
        });

        console.log(`Worker generated PDF ${i + 1}`);
      } catch (error) {
        console.error(`Error generating PDF ${i + 1}:`, error);
      }
    }

    await browser.close();
  })().catch(console.error);
}

function generateChartHTML(index) {
  let sampleHtml = `<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Report</title>
        
        <script
            src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.33.0/plotly.min.js"
            integrity="sha512-kG/veDBO4Av/ffjTdtEvtsUkVgAisp5MWbymAUc5vJlyZb3WSZ+gEC8cNlAACBzaHQQLTUKqRaNIKeIc44yD6w=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        ></script>
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
        <style>
            @media print {
                html,
                body {
                    height: 100%;
                    width: 100%;
                    margin: 0;
                    padding: 0;
                    zoom: 0.9;
                }
                @page {
                    size: A4 landscape;
                    max-height: 100%;
                    max-width: 100%;
                }
            }
        </style>
    </head>
    <body>
         
         
           
        <section>
            <!-- report body -->
            <div>
                <div
                    style="
                        text-transform: uppercase;
                        display: flex;
                        background-color: rgb(171, 45, 36);
                        color: white;
                    "
                >
                    <div
                        style="
                            flex: 1 1 0%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        "
                    >
                        PAGE NO: 1
                    </div>
                    <div class="trapezoid trapezoid-both" style="flex: 3 1 0%; font-size: 1.25rem;">
                        <div class="text">
                            <div class="d-flex flex-column">
                                <div>
                                    Loksabha elections 2024 - Tirunelveli report
                                </div>
                                <div
                                    style="
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                        font-size: 0.8rem;
                                    "
                                >
                                    
                                    <div>incharge minister : </div>
                                    <div>WIN/LOSE MARGIN : 165062</div>
                                    
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style="
                            flex: 1 1 0%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        "
                    >
                        DMK
                    </div>
                </div>
                <div
                    style="
                        border: 1px solid lightgrey;
                        border-radius: 5px;
                        background-color: rgb(252, 250, 250);
                    "
                >
                    <div
                        class="m-2 d-flex align-items-center justify-content-space-between gap-3"
                    >
                        <!-- top candidates -->
                        
                        <div class="section-1-profile-card bg-white">
                            <div class="d-flex align-items-center justify-content-start">
                                <img
                                    class="section-1-profile-card-img"
                                    src="https://placehold.co/600x400"
                                />
                                <div>
                                    <p class="font-weight-700">
                                        ROBERT BRUCE, C.
                                    </p>
                                    <p class="font-sm">INC</p>
                                </div>
                            </div>
                            <div class="candidate-votes-info">
                                <span style="font-weight: 600;">VOTES</span>
                                <span>4,99,493</span>
                            </div>
                        </div>
                        
                        <div class="section-1-profile-card bg-white">
                            <div class="d-flex align-items-center justify-content-start">
                                <img
                                    class="section-1-profile-card-img"
                                    src="https://placehold.co/600x400"
                                />
                                <div>
                                    <p class="font-weight-700">
                                        NAINAR NAGENTHRAN
                                    </p>
                                    <p class="font-sm">BJP</p>
                                </div>
                            </div>
                            <div class="candidate-votes-info">
                                <span style="font-weight: 600;">VOTES</span>
                                <span>3,34,431</span>
                            </div>
                        </div>
                        
                        <div class="section-1-profile-card bg-white">
                            <div class="d-flex align-items-center justify-content-start">
                                <img
                                    class="section-1-profile-card-img"
                                    src="https://placehold.co/600x400"
                                />
                                <div>
                                    <p class="font-weight-700">
                                        JANSI RANI, M.
                                    </p>
                                    <p class="font-sm">AIADMK</p>
                                </div>
                            </div>
                            <div class="candidate-votes-info">
                                <span style="font-weight: 600;">VOTES</span>
                                <span>88,996</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                
                    
                

                
                
                    
                

                
                
                    
                
            
                <div style="margin: 0px 0.5rem">
                    <div class="d-flex align-items-end justify-content-between">
                        <div class="trapezoid trapezoid-right">
                            <span class="text line-height-2rem" 
                                >Tirunelveli பாராளுமன்ற தொகுதியின் கவனிக்கத்தக்க தகவல்</span
                            >
                        </div>
                        <div class="d-flex gap-3">
                            <div class="section-1-img-div">
                                <div class="party-logo">
                                    <img src="https://placehold.co/300x200" />
                                </div>
                                <p
                                    style="
                                        color: black;
                                        font-size: 1rem;
                                        font-weight: 600;
                                    "
                                >
                                    MARGIN 45, 789 (2012)
                                </p>
                            </div>
                            <div class="section-1-img-div">
                                <div class="party-logo">
                                    <img src="https://placehold.co/300x200" />
                                </div>
                                <p
                                    style="
                                        color: black;
                                        font-size: 1rem;
                                        font-weight: 600;
                                    "
                                >
                                    MARGIN 45, 789 (2012)
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        style="
                            padding: 0.5rem;
                            border: 1px solid lightgrey;
                            border-radius: 5px;
                            background-color: rgb(252, 250, 250);
                        "
                    >
                        <div class="d-flex gap-2">
                            <div class="count-table">
                                <div class="section-2-table-header">
                                    <p class="m-0 text-center">
                                        பாலினம் மற்றும் வயது குழுக்கள்
                                    </p>
                                </div>
                                <div class="section-2-table-body">
                                     
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            
                                            <img
                                                src="./assets/icons/pdf_male.svg"
                                                style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                "
                                            />
                                            
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            8,08,127
                                        </p>
                                    </div>
                                    
                                    <div class="vertical-divider"></div>
                                     
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            
                                            <img
                                                src="./assets/icons/pdf_female.svg"
                                                style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                "
                                            />
                                            
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            8,46,225
                                        </p>
                                    </div>
                                    
                                    <div class="vertical-divider"></div>
                                     
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                others
                                            </p>
                                            
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            151
                                        </p>
                                    </div>
                                    
                                    <div class="vertical-divider"></div>
                                     
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                total
                                            </p>
                                            
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            16,54,503
                                        </p>
                                    </div>
                                     
                                    <div class="table-spacer"></div>
                                      
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                18-30
                                            </p>
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            3,87,599
                                        </p>
                                    </div>
                                    <div class="vertical-divider"></div>
                                    
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                31-50
                                            </p>
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            6,91,670
                                        </p>
                                    </div>
                                    <div class="vertical-divider"></div>
                                    
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                51-80
                                            </p>
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            6,03,438
                                        </p>
                                    </div>
                                    <div class="vertical-divider"></div>
                                    
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                81+
                                            </p>
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            51,677
                                        </p>
                                    </div>
                                    <div class="vertical-divider"></div>
                                      
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                Total
                                            </p>
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            16,54,503
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="count-table">
                                <div class="section-2-table-header">
                                    <p class="m-0 text-center">COMMUNITY</p>
                                </div>
                                <div class="section-2-table-body">
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            <p
                                                class="m-0 font-weight-700" 
                                            >
                                                Devar
                                            </p>
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            39%
                                        </p>
                                    </div>
                                    <div class="vertical-divider"></div>
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                Nadar
                                            </p>
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            51%
                                        </p>
                                    </div>
                                    <div class="vertical-divider"></div>
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                Cheyar
                                            </p>
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            1%
                                        </p>
                                    </div>
                                    <div class="vertical-divider"></div>
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                SC/ST
                                            </p>
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            10 %
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="count-table">
                                <div class="section-2-table-header">
                                    <p class="m-0 text-center">RELIGION</p>
                                </div>
                                <div class="section-2-table-body">
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                Hindu
                                            </p>
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            1,20,000
                                        </p>
                                    </div>
                                    <div class="vertical-divider"></div>
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                Christian
                                            </p>
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            60,000
                                        </p>
                                    </div>
                                    <div class="vertical-divider"></div>
                                    <div class="table-content">
                                        <div
                                            class="d-flex align-items-center gap-1"
                                        >
                                            <p
                                                class="m-0 font-weight-700"
                                            >
                                                Muslim
                                            </p>
                                        </div>
                                        <div class="horizontal-divider"></div>
                                        <p
                                            class="m-0"
                                            style="
                                                font-weight: 600;
                                                font-size: 0.75rem;
                                            "
                                        >
                                            38,000
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex gap-3">
                            
                            <div class="d-flex gap-1 mt-2 flex-grow-1">
                                <div
                                    class="bg-red text-white flex-grow-1 rounded"
                                >
                                    <p class="m-0 p-1 text-center">
                                        CORPORATION
                                    </p>
                                </div>
                                <div class="border flex-grow-1 rounded">
                                    <p class="m-0 p-1 text-center">2</p>
                                </div>
                            </div>
                            <div class="d-flex gap-1 mt-2 flex-grow-1">
                                <div
                                    class="bg-red text-white flex-grow-1 rounded"
                                >
                                    <p class="m-0 p-1 text-center">
                                        MUNICIPALITY
                                    </p>
                                </div>
                                <div class="border flex-grow-1 rounded">
                                    <p class="m-0 p-1 text-center">4</p>
                                </div>
                            </div>
                            <div class="d-flex gap-1 mt-2 flex-grow-1">
                                <div
                                    class="bg-red text-white flex-grow-1 rounded"
                                >
                                    <p class="m-0 p-1 text-center">
                                        TOWN PANCHAYAT
                                    </p>
                                </div>
                                <div class="border flex-grow-1 rounded">
                                    <p class="m-0 p-1 text-center">20</p>
                                </div>
                            </div>
                            <div class="d-flex gap-1 mt-2 flex-grow-1">
                                <div
                                    class="bg-red text-white flex-grow-1 rounded"
                                >
                                    <p class="m-0 p-1 text-center">WARDS</p>
                                </div>
                                <div class="border flex-grow-1 rounded">
                                    <p class="m-0 p-1 text-center">258</p>
                                </div>
                            </div>
                            
                            
                            <div class="d-flex gap-1 mt-2 flex-grow-1">
                                <div
                                    class="bg-red text-white flex-grow-1 rounded"
                                >
                                    <p class="m-0 p-1 text-center">BOOTHS</p>
                                </div>
                                <div class="border flex-grow-1 rounded">
                                    <p class="m-0 p-1 text-center">1,810</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <!-- graph section -->
            <div class="d-flex">
                <!-- graph1 -->
                <div class="reportpdf_secondpage_graphContainer w-50">
                    <div class="titleSection">
                        <div class="trapezoid trapezoid-right">
                            <div class="text line-height-2rem" >
                                தமிழ்நாட்டிற்கு உட்பட்ட நாடாளுமன்றத் தொகுதிகளின் பகுப்பாய்வு
                            </div>
                        </div>
                        <div class="statBox"></div>
                        <div class="statBox"></div>
                    </div>
                    <div
                        class="reportpdf_secondpage_graph"
                    >
                    <div class="inner-box">
                        <div>                            <div id="57c1e516-87cd-48f0-a006-d4e3452a9aa1" class="plotly-graph-div" style="height:210px; width:650px;"></div>            <script type="text/javascript">                                    window.PLOTLYENV=window.PLOTLYENV || {};                                    if (document.getElementById("57c1e516-87cd-48f0-a006-d4e3452a9aa1")) {                    Plotly.newPlot(                        "57c1e516-87cd-48f0-a006-d4e3452a9aa1",                        [{"alignmentgroup":"True","hovertemplate":"PC=%{x}<br>Votes=%{y}<extra></extra>","legendgroup":"","marker":{"color":["#fe6160","#fe6160","#fe6160","#fe6160","#fe6160","#ab2d24","#fe6160","#fe6160","#fe6160","#fe6160","#fe6160"],"pattern":{"shape":""}},"name":"","offsetgroup":"","orientation":"v","showlegend":false,"textposition":"auto","texttemplate":"%{y}","x":["Mayiladuthurai","Chennai South","Ramanathapuram","Perambalur","Chidambaram(SC)","Tirunelveli","Thanjavur","Arani","Chennai North","Krishnagiri","Viluppuram(SC)"],"xaxis":"x","y":[516534,515307,506690,505348,501851,499493,498822,497083,495733,491131,474230],"yaxis":"y","type":"bar","width":[0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75]}],                        {"template":{"data":{"histogram2dcontour":[{"type":"histogram2dcontour","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"choropleth":[{"type":"choropleth","colorbar":{"outlinewidth":0,"ticks":""}}],"histogram2d":[{"type":"histogram2d","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"heatmap":[{"type":"heatmap","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"heatmapgl":[{"type":"heatmapgl","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"contourcarpet":[{"type":"contourcarpet","colorbar":{"outlinewidth":0,"ticks":""}}],"contour":[{"type":"contour","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"surface":[{"type":"surface","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"mesh3d":[{"type":"mesh3d","colorbar":{"outlinewidth":0,"ticks":""}}],"scatter":[{"fillpattern":{"fillmode":"overlay","size":10,"solidity":0.2},"type":"scatter"}],"parcoords":[{"type":"parcoords","line":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterpolargl":[{"type":"scatterpolargl","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"bar":[{"error_x":{"color":"#2a3f5f"},"error_y":{"color":"#2a3f5f"},"marker":{"line":{"color":"#E5ECF6","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"bar"}],"scattergeo":[{"type":"scattergeo","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterpolar":[{"type":"scatterpolar","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"histogram":[{"marker":{"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"histogram"}],"scattergl":[{"type":"scattergl","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatter3d":[{"type":"scatter3d","line":{"colorbar":{"outlinewidth":0,"ticks":""}},"marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattermapbox":[{"type":"scattermapbox","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterternary":[{"type":"scatterternary","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattercarpet":[{"type":"scattercarpet","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"carpet":[{"aaxis":{"endlinecolor":"#2a3f5f","gridcolor":"white","linecolor":"white","minorgridcolor":"white","startlinecolor":"#2a3f5f"},"baxis":{"endlinecolor":"#2a3f5f","gridcolor":"white","linecolor":"white","minorgridcolor":"white","startlinecolor":"#2a3f5f"},"type":"carpet"}],"table":[{"cells":{"fill":{"color":"#EBF0F8"},"line":{"color":"white"}},"header":{"fill":{"color":"#C8D4E3"},"line":{"color":"white"}},"type":"table"}],"barpolar":[{"marker":{"line":{"color":"#E5ECF6","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"barpolar"}],"pie":[{"automargin":true,"type":"pie"}]},"layout":{"autotypenumbers":"strict","colorway":["#636efa","#EF553B","#00cc96","#ab63fa","#FFA15A","#19d3f3","#FF6692","#B6E880","#FF97FF","#FECB52"],"font":{"color":"#2a3f5f"},"hovermode":"closest","hoverlabel":{"align":"left"},"paper_bgcolor":"white","plot_bgcolor":"#E5ECF6","polar":{"bgcolor":"#E5ECF6","angularaxis":{"gridcolor":"white","linecolor":"white","ticks":""},"radialaxis":{"gridcolor":"white","linecolor":"white","ticks":""}},"ternary":{"bgcolor":"#E5ECF6","aaxis":{"gridcolor":"white","linecolor":"white","ticks":""},"baxis":{"gridcolor":"white","linecolor":"white","ticks":""},"caxis":{"gridcolor":"white","linecolor":"white","ticks":""}},"coloraxis":{"colorbar":{"outlinewidth":0,"ticks":""}},"colorscale":{"sequential":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"sequentialminus":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"diverging":[[0,"#8e0152"],[0.1,"#c51b7d"],[0.2,"#de77ae"],[0.3,"#f1b6da"],[0.4,"#fde0ef"],[0.5,"#f7f7f7"],[0.6,"#e6f5d0"],[0.7,"#b8e186"],[0.8,"#7fbc41"],[0.9,"#4d9221"],[1,"#276419"]]},"xaxis":{"gridcolor":"white","linecolor":"white","ticks":"","title":{"standoff":15},"zerolinecolor":"white","automargin":true,"zerolinewidth":2},"yaxis":{"gridcolor":"white","linecolor":"white","ticks":"","title":{"standoff":15},"zerolinecolor":"white","automargin":true,"zerolinewidth":2},"scene":{"xaxis":{"backgroundcolor":"#E5ECF6","gridcolor":"white","linecolor":"white","showbackground":true,"ticks":"","zerolinecolor":"white","gridwidth":2},"yaxis":{"backgroundcolor":"#E5ECF6","gridcolor":"white","linecolor":"white","showbackground":true,"ticks":"","zerolinecolor":"white","gridwidth":2},"zaxis":{"backgroundcolor":"#E5ECF6","gridcolor":"white","linecolor":"white","showbackground":true,"ticks":"","zerolinecolor":"white","gridwidth":2}},"shapedefaults":{"line":{"color":"#2a3f5f"}},"annotationdefaults":{"arrowcolor":"#2a3f5f","arrowhead":0,"arrowwidth":1},"geo":{"bgcolor":"white","landcolor":"#E5ECF6","subunitcolor":"white","showland":true,"showlakes":true,"lakecolor":"white"},"title":{"x":0.05},"mapbox":{"style":"light"}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"PC"}},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{"text":"Votes"}},"legend":{"tracegroupgap":0},"margin":{"t":0,"b":0,"l":0,"r":0},"barmode":"relative","font":{"size":12,"family":"'Inter', 'sans serif'"},"paper_bgcolor":"#e3e2e1","plot_bgcolor":"#e3e2e1","showlegend":false,"height":210,"width":650},                        {"displayModeBar": false, "responsive": true}                    )                };                            </script>        </div>
                    </div>
                    </div>
                </div>
                <!-- graph2 -->
                <div class="reportpdf_secondpage_graphContainer w-50">
                    <div class="titleSection">
                        <div class="trapezoid trapezoid-right">
                            <div class="text line-height-2rem">
                                Tirunelveli பாராளுமன்ற தொகுதிக்குட்பட்ட சட்டமன்ற தொகுதிகளின் பகுப்பாய்வு
                            </div>
                        </div>
                        <div class="statBox"></div>
                        <div class="statBox"></div>
                    </div>
                    <div
                        class="reportpdf_secondpage_graph"
                    >
                    <div class="inner-box">
                        
                        <div>                            <div id="0e0954d2-b904-4853-9a66-cf0b7661f5db" class="plotly-graph-div" style="height:210px; width:650px;"></div>            <script type="text/javascript">                                    window.PLOTLYENV=window.PLOTLYENV || {};                                    if (document.getElementById("0e0954d2-b904-4853-9a66-cf0b7661f5db")) {                    Plotly.newPlot(                        "0e0954d2-b904-4853-9a66-cf0b7661f5db",                        [{"alignmentgroup":"True","hovertemplate":"Assembly Constituency=%{x}<br>Margin Percentage=%{y}<extra></extra>","legendgroup":"","marker":{"color":["#0e9103","#0e9103","#0e9103","#0e9103","#0e9103","#0e9103"],"pattern":{"shape":""}},"name":"","offsetgroup":"","orientation":"v","showlegend":false,"textposition":"auto","texttemplate":"%{y}","x":["Palayamkottai","Alangulam","Tirunelveli","Nanguneri","Ambasamudram","Radhapuram"],"xaxis":"x","y":[31.4,14.69,10.38,13.71,13.25,12.14],"yaxis":"y","type":"bar","width":[0.75,0.75,0.75,0.75,0.75,0.75]}],                        {"template":{"data":{"histogram2dcontour":[{"type":"histogram2dcontour","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"choropleth":[{"type":"choropleth","colorbar":{"outlinewidth":0,"ticks":""}}],"histogram2d":[{"type":"histogram2d","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"heatmap":[{"type":"heatmap","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"heatmapgl":[{"type":"heatmapgl","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"contourcarpet":[{"type":"contourcarpet","colorbar":{"outlinewidth":0,"ticks":""}}],"contour":[{"type":"contour","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"surface":[{"type":"surface","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"mesh3d":[{"type":"mesh3d","colorbar":{"outlinewidth":0,"ticks":""}}],"scatter":[{"fillpattern":{"fillmode":"overlay","size":10,"solidity":0.2},"type":"scatter"}],"parcoords":[{"type":"parcoords","line":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterpolargl":[{"type":"scatterpolargl","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"bar":[{"error_x":{"color":"#2a3f5f"},"error_y":{"color":"#2a3f5f"},"marker":{"line":{"color":"#E5ECF6","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"bar"}],"scattergeo":[{"type":"scattergeo","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterpolar":[{"type":"scatterpolar","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"histogram":[{"marker":{"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"histogram"}],"scattergl":[{"type":"scattergl","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatter3d":[{"type":"scatter3d","line":{"colorbar":{"outlinewidth":0,"ticks":""}},"marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattermapbox":[{"type":"scattermapbox","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterternary":[{"type":"scatterternary","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattercarpet":[{"type":"scattercarpet","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"carpet":[{"aaxis":{"endlinecolor":"#2a3f5f","gridcolor":"white","linecolor":"white","minorgridcolor":"white","startlinecolor":"#2a3f5f"},"baxis":{"endlinecolor":"#2a3f5f","gridcolor":"white","linecolor":"white","minorgridcolor":"white","startlinecolor":"#2a3f5f"},"type":"carpet"}],"table":[{"cells":{"fill":{"color":"#EBF0F8"},"line":{"color":"white"}},"header":{"fill":{"color":"#C8D4E3"},"line":{"color":"white"}},"type":"table"}],"barpolar":[{"marker":{"line":{"color":"#E5ECF6","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"barpolar"}],"pie":[{"automargin":true,"type":"pie"}]},"layout":{"autotypenumbers":"strict","colorway":["#636efa","#EF553B","#00cc96","#ab63fa","#FFA15A","#19d3f3","#FF6692","#B6E880","#FF97FF","#FECB52"],"font":{"color":"#2a3f5f"},"hovermode":"closest","hoverlabel":{"align":"left"},"paper_bgcolor":"white","plot_bgcolor":"#E5ECF6","polar":{"bgcolor":"#E5ECF6","angularaxis":{"gridcolor":"white","linecolor":"white","ticks":""},"radialaxis":{"gridcolor":"white","linecolor":"white","ticks":""}},"ternary":{"bgcolor":"#E5ECF6","aaxis":{"gridcolor":"white","linecolor":"white","ticks":""},"baxis":{"gridcolor":"white","linecolor":"white","ticks":""},"caxis":{"gridcolor":"white","linecolor":"white","ticks":""}},"coloraxis":{"colorbar":{"outlinewidth":0,"ticks":""}},"colorscale":{"sequential":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"sequentialminus":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"diverging":[[0,"#8e0152"],[0.1,"#c51b7d"],[0.2,"#de77ae"],[0.3,"#f1b6da"],[0.4,"#fde0ef"],[0.5,"#f7f7f7"],[0.6,"#e6f5d0"],[0.7,"#b8e186"],[0.8,"#7fbc41"],[0.9,"#4d9221"],[1,"#276419"]]},"xaxis":{"gridcolor":"white","linecolor":"white","ticks":"","title":{"standoff":15},"zerolinecolor":"white","automargin":true,"zerolinewidth":2},"yaxis":{"gridcolor":"white","linecolor":"white","ticks":"","title":{"standoff":15},"zerolinecolor":"white","automargin":true,"zerolinewidth":2},"scene":{"xaxis":{"backgroundcolor":"#E5ECF6","gridcolor":"white","linecolor":"white","showbackground":true,"ticks":"","zerolinecolor":"white","gridwidth":2},"yaxis":{"backgroundcolor":"#E5ECF6","gridcolor":"white","linecolor":"white","showbackground":true,"ticks":"","zerolinecolor":"white","gridwidth":2},"zaxis":{"backgroundcolor":"#E5ECF6","gridcolor":"white","linecolor":"white","showbackground":true,"ticks":"","zerolinecolor":"white","gridwidth":2}},"shapedefaults":{"line":{"color":"#2a3f5f"}},"annotationdefaults":{"arrowcolor":"#2a3f5f","arrowhead":0,"arrowwidth":1},"geo":{"bgcolor":"white","landcolor":"#E5ECF6","subunitcolor":"white","showland":true,"showlakes":true,"lakecolor":"white"},"title":{"x":0.05},"mapbox":{"style":"light"}}},"xaxis":{"anchor":"y","domain":[0.0,1.0],"title":{"text":"Assembly Constituency"}},"yaxis":{"anchor":"x","domain":[0.0,1.0],"title":{"text":"Margin Percentage"}},"legend":{"tracegroupgap":0},"margin":{"t":0,"b":0,"l":0,"r":0},"barmode":"relative","font":{"size":12,"family":"'Inter', 'sans serif'"},"paper_bgcolor":"#e3e2e1","plot_bgcolor":"#e3e2e1","showlegend":false,"height":210,"width":650},                        {"displayModeBar": false, "responsive": true}                    )                };                            </script>        </div>
                        
                    </div>
                    </div>
                </div>
            </div>
            <!-- graph and summary section -->
            <div class="d-flex">
                <!-- graph3 -->
                <div
                    class="reportpdf_secondpage_graphContainer"
                    style="width: 30%"
                >
                    <div class="titleSection">
                        <div class="trapezoid trapezoid-right">
                            <div class="text line-height-2rem">PARTY VOTE SHARE</div>
                        </div>
                        <div class="statBox"></div>
                        <div class="statBox"></div>
                    </div>
                    <div
                        class="reportpdf_secondpage_graph"
                    >
                    <div class="inner-box">
                        <div>                            <div id="6aa8d4cf-75e0-47c9-8a09-f4e612cb97a8" class="plotly-graph-div" style="height:212px; width:400px;"></div>            <script type="text/javascript">                                    window.PLOTLYENV=window.PLOTLYENV || {};                                    if (document.getElementById("6aa8d4cf-75e0-47c9-8a09-f4e612cb97a8")) {                    Plotly.newPlot(                        "6aa8d4cf-75e0-47c9-8a09-f4e612cb97a8",                        [{"domain":{"x":[0.0,1.0],"y":[0.0,1.0]},"hovertemplate":"pc=%{label}<br>votes=%{value}<extra></extra>","labels":["INC","BJP","AIADMK","Others"],"legendgroup":"","name":"","showlegend":true,"values":[47.09,31.53,8.39,12.99],"type":"pie","textinfo":"label+percent","textposition":"inside"}],                        {"template":{"data":{"histogram2dcontour":[{"type":"histogram2dcontour","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"choropleth":[{"type":"choropleth","colorbar":{"outlinewidth":0,"ticks":""}}],"histogram2d":[{"type":"histogram2d","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"heatmap":[{"type":"heatmap","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"heatmapgl":[{"type":"heatmapgl","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"contourcarpet":[{"type":"contourcarpet","colorbar":{"outlinewidth":0,"ticks":""}}],"contour":[{"type":"contour","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"surface":[{"type":"surface","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"mesh3d":[{"type":"mesh3d","colorbar":{"outlinewidth":0,"ticks":""}}],"scatter":[{"fillpattern":{"fillmode":"overlay","size":10,"solidity":0.2},"type":"scatter"}],"parcoords":[{"type":"parcoords","line":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterpolargl":[{"type":"scatterpolargl","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"bar":[{"error_x":{"color":"#2a3f5f"},"error_y":{"color":"#2a3f5f"},"marker":{"line":{"color":"#E5ECF6","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"bar"}],"scattergeo":[{"type":"scattergeo","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterpolar":[{"type":"scatterpolar","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"histogram":[{"marker":{"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"histogram"}],"scattergl":[{"type":"scattergl","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatter3d":[{"type":"scatter3d","line":{"colorbar":{"outlinewidth":0,"ticks":""}},"marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattermapbox":[{"type":"scattermapbox","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterternary":[{"type":"scatterternary","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattercarpet":[{"type":"scattercarpet","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"carpet":[{"aaxis":{"endlinecolor":"#2a3f5f","gridcolor":"white","linecolor":"white","minorgridcolor":"white","startlinecolor":"#2a3f5f"},"baxis":{"endlinecolor":"#2a3f5f","gridcolor":"white","linecolor":"white","minorgridcolor":"white","startlinecolor":"#2a3f5f"},"type":"carpet"}],"table":[{"cells":{"fill":{"color":"#EBF0F8"},"line":{"color":"white"}},"header":{"fill":{"color":"#C8D4E3"},"line":{"color":"white"}},"type":"table"}],"barpolar":[{"marker":{"line":{"color":"#E5ECF6","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"barpolar"}],"pie":[{"automargin":true,"type":"pie"}]},"layout":{"autotypenumbers":"strict","colorway":["#636efa","#EF553B","#00cc96","#ab63fa","#FFA15A","#19d3f3","#FF6692","#B6E880","#FF97FF","#FECB52"],"font":{"color":"#2a3f5f"},"hovermode":"closest","hoverlabel":{"align":"left"},"paper_bgcolor":"white","plot_bgcolor":"#E5ECF6","polar":{"bgcolor":"#E5ECF6","angularaxis":{"gridcolor":"white","linecolor":"white","ticks":""},"radialaxis":{"gridcolor":"white","linecolor":"white","ticks":""}},"ternary":{"bgcolor":"#E5ECF6","aaxis":{"gridcolor":"white","linecolor":"white","ticks":""},"baxis":{"gridcolor":"white","linecolor":"white","ticks":""},"caxis":{"gridcolor":"white","linecolor":"white","ticks":""}},"coloraxis":{"colorbar":{"outlinewidth":0,"ticks":""}},"colorscale":{"sequential":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"sequentialminus":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"diverging":[[0,"#8e0152"],[0.1,"#c51b7d"],[0.2,"#de77ae"],[0.3,"#f1b6da"],[0.4,"#fde0ef"],[0.5,"#f7f7f7"],[0.6,"#e6f5d0"],[0.7,"#b8e186"],[0.8,"#7fbc41"],[0.9,"#4d9221"],[1,"#276419"]]},"xaxis":{"gridcolor":"white","linecolor":"white","ticks":"","title":{"standoff":15},"zerolinecolor":"white","automargin":true,"zerolinewidth":2},"yaxis":{"gridcolor":"white","linecolor":"white","ticks":"","title":{"standoff":15},"zerolinecolor":"white","automargin":true,"zerolinewidth":2},"scene":{"xaxis":{"backgroundcolor":"#E5ECF6","gridcolor":"white","linecolor":"white","showbackground":true,"ticks":"","zerolinecolor":"white","gridwidth":2},"yaxis":{"backgroundcolor":"#E5ECF6","gridcolor":"white","linecolor":"white","showbackground":true,"ticks":"","zerolinecolor":"white","gridwidth":2},"zaxis":{"backgroundcolor":"#E5ECF6","gridcolor":"white","linecolor":"white","showbackground":true,"ticks":"","zerolinecolor":"white","gridwidth":2}},"shapedefaults":{"line":{"color":"#2a3f5f"}},"annotationdefaults":{"arrowcolor":"#2a3f5f","arrowhead":0,"arrowwidth":1},"geo":{"bgcolor":"white","landcolor":"#E5ECF6","subunitcolor":"white","showland":true,"showlakes":true,"lakecolor":"white"},"title":{"x":0.05},"mapbox":{"style":"light"}}},"legend":{"tracegroupgap":0},"margin":{"t":0,"b":0,"l":0,"r":0},"showlegend":false,"font":{"size":12,"family":"'Inter', 'sans serif'"},"height":212,"width":400},                        {"displayModeBar": false, "responsive": true}                    )                };                            </script>        </div>
                    </div>
                    </div>
                </div>
                <!-- summary -->
                <div
                    class="reportpdf_secondpage_graphContainer"
                    style="width: 70%"
                >
                    <div class="titleSection">
                        <div class="trapezoid trapezoid-right">
                            <div class="text line-height-2rem" >
                                Tirunelveli கவனிக்கத்தக்க தகவல
                            </div>
                        </div>
                        <div class="statBox"></div>
                        <div class="statBox"></div>
                    </div>
                    <div
                        class="reportpdf_secondpage_graph d-flex flex-column align-items-start justify-content-between"
                        style="
                            border-radius: 0px 0px 15px 15px;
                            border: 1px solid lightgrey;
                            height: 14rem;
                            background-color: #fcfafa;
                        "
                    >
                        <div class="insight-container"
                        >
                            <div class="insight-icon">
                                    <img src="assets/icons/pdf_insight_1.svg" style="width: 3rem; height: 3rem;" alt="">
                            </div>
                            <div>
                                    திருநெல்வேலியில் உள்ள வாக்காளர்களில் முதியோர்கள் 31-50 (41.73%), இளைஞர்கள் (18-30) 23.78%. நடு வயதினர் (51-80) 33.67% மற்றும் பெரியோர்கள் (81+) 0.81% உள்ளனர்
                            </div>
                        </div>
                        <div class="insight-container" style="background-color: white;">
                            <div class="insight-icon">
                                    <img src="assets/icons/pdf_insight_2.svg" style="width: 3rem; height: 3rem;" alt="">
                            </div>
                            <div>
                                    மொத்த வாக்காளர்களின் எண்ணிக்கை 249692 அதில் ஆண்கள்-121721, பெண்கள்-127950 ஆகும்
                            </div>
                        </div>
                        <div class="insight-container">
                            <div class="insight-icon">
                                    <img src="assets/icons/pdf_insight_3.svg" style="width: 3rem; height: 3rem;" alt="">
                            </div>
                            <div>
                                    திருநெல்வேலி தொகுதியில் நாடார் சமூகத்தினரின் எண்ணிக்கை பலத்தால் ஆதாயமடைந்த திரு. ராபர்ட் புரூஸ் எம்.பி இடத்தைப் பெற்றார்
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="page-break"></div>
    </body>
</html>`;
  let familyGraphLayout = {
    height: 300,
    width: 1200,
  };
  let item = originalData[index];
  let { hierarchy } = item;
  let { level, name, num } = hierarchy;

  let isPc = level === "PC";
  let isAc = level === "AC";
  let isLb = level === "LB";
  let isBooth = level === "BOOTH";
  let xFamilyAxis;
  let yFamilyAxis;
  let familyChartStrData;
  let familyChartStrLayout;
  let familyBarChart = "<div></div>";
  let xVoteShareAxis;
  let yVoteShareAxis;
  let voteShareChartStrData;
  let voteShareChartStrLayout;
  let voteSharePieChart = "<div></div>";
  let xDrilldownAxis;
  let yDrilldownAxis;
  let drillDownChartData;
  let drillDownChartLayout;
  let drillDownChartStrData;
  let drillDownChartStrLayout;
  let drillDownBarChart = "<div></div>";
  if (isPc) {
    xFamilyAxis = item["pc_family_graph_data"]["x"];
    yFamilyAxis = item["pc_family_graph_data"]["y"];
    familyGraphData = [
      {
        x: xFamilyAxis,
        y: yFamilyAxis,
        type: "bar",
      },
    ];
    familyChartStrData = JSON.stringify(familyGraphData);
    familyChartStrLayout = JSON.stringify(familyGraphLayout);

    familyBarChart = `
    <div class="reportpdf_secondpage_graphContainer">
            <div class="titleSection">
              <div class="trapezoid trapezoid-right">
                <div class="text line-height-2rem">
                  TAMILNADU UTPADA NADALUMANDRA THOGUTHIYIN PAGUPAIVU
                </div>
              </div>
              <div class="statBox">POLLING PERENTAGE: 53 %</div>
              <div class="statBox">TOTAL VOTERS: 1,654,503</div>
            </div>
            <div
              class="reportpdf_secondpage_graph"
                style="
                  border-radius: 0px 0px 15px 15px;
                  border: 1px solid lightgrey;
                  height: 20rem;
                "
              >
                <div id="familyBarChart${index}"></div>
                <script>
                  Plotly.newPlot('familyBarChart${index}', ${familyChartStrData}, ${familyChartStrLayout});
                </script>
              </div>
            </div>
          </div>
    `;
  }

  xVoteShareAxis = item["selected_level_graph_data"]["x"];
  yVoteShareAxis = item["selected_level_graph_data"]["y"];

  voteSharePieData = [
    {
      values: yVoteShareAxis,
      labels: xVoteShareAxis,
      type: "pie",
    },
  ];
  voteSharePieLayout = {
    height: 300,
    width: 300,
  };
  voteShareChartStrData = JSON.stringify(voteSharePieData);
  voteShareChartStrLayout = JSON.stringify(voteSharePieLayout);
  voteSharePieChart = `<div class="reportpdf_secondpage_graphContainer">
    <div class="titleSection">
      <div class="trapezoid trapezoid-right">
        <div class="text line-height-2rem">PARTY VOTE SHARE</div>
      </div>
      <div class="statBox"></div>
      <div class="statBox"></div>
    </div>
    <div
      class="reportpdf_secondpage_graph"
      style="
        border-radius: 0px 0px 15px 15px;
        border: 1px solid lightgrey;
        height: 20rem;
      "
    >
      <div id="voteSharePieChart${index}"></div>
                <script>
                  Plotly.newPlot('voteSharePieChart${index}', ${voteShareChartStrData}, ${voteShareChartStrLayout});
                </script>
    </div>
  </div>`;

  if (!isBooth) {
    xDrilldownAxis = item["drilldown_data"]["x"];
    yDrilldownAxis = item["drilldown_data"]["y"];
    drillDownChartData = [
      {
        x: xDrilldownAxis,
        y: yDrilldownAxis,
        type: "bar",
      },
    ];
    drillDownChartLayout = {
      height: 300,
      width: 1200,
    };

    drillDownChartStrData = JSON.stringify(drillDownChartData);
    drillDownChartStrLayout = JSON.stringify(drillDownChartLayout);
    drillDownBarChart = `<div class="reportpdf_secondpage_graphContainer" style="width: 100%">
      <div class="titleSection">
        <div class="trapezoid trapezoid-right">
          <div class="text line-height-2rem">
            TAMILNADU UTPADA NADALUMANDRA THOGUTHIYIN PAGUPAIVU
          </div>
        </div>
        <div class="statBox"></div>
        <div class="statBox"></div>
      </div>
      <div
        class="reportpdf_secondpage_graph"
        style="
          border-radius: 0px 0px 15px 15px;
          border: 1px solid lightgrey;
          height: 20rem;
        "
      >
              <div id="drillDownBarChart${index}"></div>
                  <script>
                    Plotly.newPlot('drillDownBarChart${index}', ${drillDownChartStrData}, ${drillDownChartStrLayout});
                  </script>
          
      </div>
    </div>`;
  }

  mainContent += `
  <div>
  <div>
    <div
      style="
        text-transform: uppercase;
        display: flex;
        background-color: rgb(171, 45, 36);
        color: white;
      "
    >
      <div style="flex: 1 1 25%; display: grid; place-content: center">
        PAGE NO: ${index + 1}
      </div>
      <div class="trapezoid trapezoid-both">
        <div class="text">
          Loksabha elections 2024 - Parliamentary constituency report
        </div>
      </div>
      <div
        style="
          flex: 1 1 25%;
          display: grid;
          place-content: center;
          text-align: center;
        "
      >
        ${name}
      </div>
    </div>
    <div
      style="
        margin: 0.5rem;
        padding: 0.5rem;
        border: 1px solid lightgrey;
        border-radius: 5px;
        background-color: rgb(252, 250, 250);
      "
    >
      <div class="section-1-title">
        <p style="color: black; font-size: 1.5rem; font-weight: 600">
          ${name} (${level})
        </p>
        <div class="d-flex">
          <div class="section-1-img-div">
            <div class="party-logo">
              <img src="https://placehold.co/300x200" />
            </div>
            <p style="color: black; font-size: 1rem; font-weight: 600">
              MARGIN 45, 789
            </p>
            <p style="color: black; font-size: 1rem; font-weight: 600">2012</p>
          </div>
          <div class="section-1-img-div">
            <div class="party-logo">
              <img src="https://placehold.co/300x200" />
            </div>
            <p style="color: black; font-size: 1rem; font-weight: 600">
              MARGIN 45, 789
            </p>
            <p style="color: black; font-size: 1rem; font-weight: 600">2012</p>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; height: 14rem">
        <div
          style="
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
          "
        >
          <div
            style="
              display: flex;
              align-items: center;
              width: 100%;
              height: 4.5rem;
              margin: 0.25rem 0px;
              background-color: rgb(255, 255, 255);
            "
          >
            <div
              style="
                color: grey;
                font-weight: 600;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              DISTRICT NAME
            </div>
            <div
              style="
                color: black;
                font-weight: 800;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              <div>-</div>
              <div style="font-size: 0.9rem"></div>
            </div>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              width: 100%;
              height: 4.5rem;
              margin: 0.25rem 0px;
              background-color: rgb(247, 247, 247);
            "
          >
            <div
              style="
                color: grey;
                font-weight: 600;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              DISTRICT SECRETARY
            </div>
            <div
              style="
                color: black;
                font-weight: 800;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              <div>-</div>
              <div style="font-size: 0.9rem"></div>
            </div>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              width: 100%;
              height: 4.5rem;
              margin: 0.25rem 0px;
              background-color: rgb(255, 255, 255);
            "
          >
            <div
              style="
                color: grey;
                font-weight: 600;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              PARTY DISTRICT SECRETARY
            </div>
            <div
              style="
                color: black;
                font-weight: 800;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              <div>-</div>
              <div style="font-size: 0.9rem"></div>
            </div>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              width: 100%;
              height: 4.5rem;
              margin: 0.25rem 0px;
              background-color: rgb(247, 247, 247);
            "
          >
            <div
              style="
                color: grey;
                font-weight: 600;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              IN - CHARGE MINISTER
            </div>
            <div
              style="
                color: black;
                font-weight: 800;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              <div>-</div>
              <div style="font-size: 0.9rem"></div>
            </div>
          </div>
        </div>
        <div
          style="
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
          "
        >
          <div
            style="
              display: flex;
              align-items: center;
              width: 100%;
              height: 4.5rem;
              margin: 0.25rem 0px;
              background-color: rgb(255, 255, 255);
            "
          >
            <div
              style="
                color: grey;
                font-weight: 600;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              MEMBER OF PARLIAMENT
            </div>
            <div
              style="
                color: black;
                font-weight: 800;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              <div>-</div>
              <div style="font-size: 0.9rem"></div>
            </div>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              width: 100%;
              height: 4.5rem;
              margin: 0.25rem 0px;
              background-color: rgb(247, 247, 247);
            "
          >
            <div
              style="
                color: grey;
                font-weight: 600;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              WIN/LOSE MARGIN
            </div>
            <div
              style="
                color: black;
                font-weight: 800;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              <div>15.75</div>
              <div style="font-size: 0.9rem"></div>
            </div>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              width: 100%;
              height: 4.5rem;
              margin: 0.25rem 0px;
              background-color: rgb(255, 255, 255);
            "
          >
            <div
              style="
                color: grey;
                font-weight: 600;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              PARLIAMENTARY CONSTITUENCY
            </div>
            <div
              style="
                color: black;
                font-weight: 800;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              <div>Tirunelveli</div>
              <div style="font-size: 0.9rem"></div>
            </div>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              width: 100%;
              height: 4.5rem;
              margin: 0.25rem 0px;
              background-color: rgb(247, 247, 247);
            "
          >
            <div
              style="
                color: grey;
                font-weight: 600;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              VOTES &amp; VOTES SHARE
            </div>
            <div
              style="
                color: black;
                font-weight: 800;
                flex: 1 1 50%;
                padding-left: 2rem;
              "
            >
              <div>414799</div>
              <div style="font-size: 0.9rem">(47.7%)</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="m-2 d-flex align-items-center justify-content-space-between gap-3"
      >
        <div class="section-1-profile-card bg-white">
          <img
            class="section-1-profile-card-img"
            src="https://placehold.co/600x400"
          />
          <div>
            <p style="font-weight: 700">ROBERT BRUCE, C.</p>
            <p class="font-sm">Current Mla</p>
            <p class="font-sm">INC</p>
          </div>
        </div>
        <div class="section-1-profile-card bg-white">
          <img
            class="section-1-profile-card-img"
            src="https://placehold.co/600x400"
          />
          <div>
            <p style="font-weight: 700">NAINAR NAGENTHRAN</p>
            <p class="font-sm">Current Mla</p>
            <p class="font-sm">BJP</p>
          </div>
        </div>
        <div class="section-1-profile-card bg-white">
          <img
            class="section-1-profile-card-img"
            src="https://placehold.co/600x400"
          />
          <div>
            <p style="font-weight: 700">JANSI RANI, M.</p>
            <p class="font-sm">Current Mla</p>
            <p class="font-sm">AIADMK</p>
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 0.5rem">
      <div class="trapezoid trapezoid-right">
        <span class="text line-height-2rem"
          >Tirunelveli பாராளுமன்ற தொகுதியின் கவனிக்கத்தக்க தகவல்</span
        >
      </div>
      <div
        style="
          padding: 0.5rem;
          border: 1px solid lightgrey;
          border-radius: 5px;
          background-color: rgb(252, 250, 250);
        "
      >
        <div class="d-flex gap-2">
          <div class="count-table">
            <div class="section-2-table-header">
              <p class="m-0 text-center">GENDER</p>
            </div>
            <div class="section-2-table-body">
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Male Voters Count</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">808,127</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Female Voters Count</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">846,225</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Others</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">151</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Total</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">1,654,503</p>
              </div>
            </div>
          </div>
          <div class="count-table">
            <div class="section-2-table-header">
              <p class="m-0 text-center">AGE GROUPS</p>
            </div>
            <div class="section-2-table-body">
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">18 - 30</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">41,415</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">31 - 50</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">88,247</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">51 - 80</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">91,298</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">81+</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">7,839</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Total</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">1,654,503</p>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex gap-2 mt-2">
          <div class="count-table">
            <div class="section-2-table-header">
              <p class="m-0 text-center">COMMUNITY</p>
            </div>
            <div class="section-2-table-body">
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Devar</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">39%</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Nadar</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">51%</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Cheyar</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">1%</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">SC/ST</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">10 %</p>
              </div>
            </div>
          </div>
          <div class="count-table">
            <div class="section-2-table-header">
              <p class="m-0 text-center">RELIGION</p>
            </div>
            <div class="section-2-table-body">
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Hindu</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">120000</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Christian</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">60000</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Muslim</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">38000</p>
              </div>
            </div>
          </div>
          <div class="count-table">
            <div class="section-2-table-header">
              <p class="m-0 text-center">LOCAL BODIES</p>
            </div>
            <div class="section-2-table-body">
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Corporation</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">2</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Municipality</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">4</p>
              </div>
              <div class="vertical-divider"></div>
              <div class="table-content">
                <p class="m-0" style="font-weight: 600">Town Panchayat</p>
                <div class="horizontal-divider"></div>
                <p class="m-0" style="font-weight: 600">20</p>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex gap-3">
          <div class="d-flex gap-1 mt-4 flex-grow-1">
            <div class="bg-red text-white flex-grow-1 rounded">
              <p class="m-0 p-1 text-center">WARDS</p>
            </div>
            <div class="border flex-grow-1 rounded">
              <p class="m-0 p-1 text-center">258 WARDS</p>
            </div>
          </div>
          <div class="d-flex gap-1 mt-4 flex-grow-1">
            <div class="bg-red text-white flex-grow-1 rounded">
              <p class="m-0 p-1 text-center">BOOTHS</p>
            </div>
            <div class="border flex-grow-1 rounded">
              <p class="m-0 p-1 text-center">1810 BOOTHS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-break"></div>
  <div>
    ${familyBarChart}
    <div class="d-flex">
      ${voteSharePieChart}
      ${drillDownBarChart}
    </div>
  </div>
  <div class="page-break"></div>
</div>`;
  return sampleHtml;
}

async function combinePDFs(start, end) {
  const mergedPdf = await PDFDocument.create();

  for (let i = start; i < end; i++) {
    try {
      const pdfBytes = await fs.readFile(
        path.join(OUTPUT_DIR, `page_${i}.pdf`)
      );
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    } catch (error) {
      console.error(`Error processing PDF ${i + 1}:`, error);
    }
  }

  const pdfBytes = await mergedPdf.save();

  const combinedPdfPath = path.join(OUTPUT_DIR, "combined.pdf");
  if (start === 0) {
    await fs.writeFile(combinedPdfPath, pdfBytes);
  } else {
    const existingPdfBytes = await fs.readFile(combinedPdfPath);
    const existingPdf = await PDFDocument.load(existingPdfBytes);
    const pdfToAppend = await PDFDocument.load(pdfBytes);
    const copiedPages = await existingPdf.copyPages(
      pdfToAppend,
      pdfToAppend.getPageIndices()
    );
    copiedPages.forEach((page) => existingPdf.addPage(page));
    const newPdfBytes = await existingPdf.save();
    await fs.writeFile(combinedPdfPath, newPdfBytes);
  }

  console.log(`Combined PDFs for pages ${start + 1} to ${end}`);
}
