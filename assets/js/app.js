// JavaScript to handle mouseover and mouseout events
var activeDemoMethodPill = null;
var activeDemoScenePill = null;
var activeDemoModePill = null;
var activeDemoVidID = 0;
var select = false;

var activeCompMethodPill = null;
var activeCompScenePill = null;
var activeCompModePill = null;


var activeCompRmMethodPill = null;
var activeCompRmScenePill = null;
var activeCompRmModePill = null;

var activeAblDataMethodPill = null;
var activeAblDataScenePill = null;
var activeAblDataModePill = null;

var activeAblCondMethodPill = null;
var activeAblCondScenePill = null;
var activeAblCondModePill = null;

var activeTrainDataMethodPill = null;
var activeTrainDataScenePill = null;
var activeTrainDataModePill = null;

var activeTrimaskMethodPill = null;
var activeTrimaskScenePill = null;
var activeTrimaskModePill = null;

var activeT2VPriorMethodPill = null;
var activeT2VPriorScenePill = null;
var activeT2VPriorModePill = null;

var activeSelfAttnMethodPill = null;
var activeSelfAttnScenePill = null;
var activeSelfAttnModePill = null;

var activeFailureMethodPill = null;
var activeFailureScenePill = null;
var activeFailureModePill = null;

var carousels = null;

var demo_items = null;

disable_methods = {
    "boat": ["factormatte"],
    "goat": ["factormatte"],
    "camel": ["factormatte"],
    "car-roundabout": ["factormatte"],
    "bear": ["factormatte"],
    "boys-beach": ["factormatte"],
    "omnimatte-rf-walk": ["omnimatte", "omnimatte3d", "factormatte"],
    "factormatte-sandcar": ["omnimatte", "omnimatte3d", "omnimatterf"],
    "factormatte-puddle": ["omnimatte", "omnimatte3d", "omnimatterf"],
    "two-horses": ["factormatte"],
    "kite-walk": ["factormatte"],
    "eval-cars": ["factormatte"],
    "eval-bag": ["factormatte"],
    "eval-dog": ["factormatte"],
    "eval-donkey": ["factormatte"],
}

disable_modes = {
    "boat": ["alpha1", "fg2", "alpha2", "fg3", "alpha3"],
    "goat": ["alpha1", "fg2", "alpha2", "fg3", "alpha3"],
    "camel": ["alpha1", "fg2", "alpha2", "fg3", "alpha3"],
    "bear": ["alpha1", "fg2", "alpha2", "fg3", "alpha3"],
    "omnimatte-rf-walk": ["alpha1", "fg2", "alpha2", "fg3", "alpha3"],
    "car-roundabout": ["alpha1", "fg2", "alpha2", "fg3", "alpha3"],
    "factormatte-sandcar": ["alpha1", "alpha1", "fg2", "alpha2", "fg3", "alpha3"],
    "factormatte-puddle": ["alpha1", "fg2", "alpha2", "fg3", "alpha3"],
    "boys-beach": ["alpha1", "alpha2", "fg3", "alpha3"],
    "two-horses": ["alpha1", "alpha2", "fg3", "alpha3"],
    "kite-walk": ["alpha1", "alpha2", "fg3", "alpha3"],
    "eval-donkey": ["alpha1", "alpha2", "fg3", "alpha3"],
    "eval-dog": ["alpha1", "fg2", "alpha2", "fg3", "alpha3"],
    "eval-cars": ["alpha1", "alpha2", "alpha3"],
    "eval-bag": ["alpha1", "fg2", "alpha2", "fg3", "alpha3"],
}


disable_objrm_methods = {
    "boat": [],
    "car-puddle": [],
    "cartoon": [],
    "parkour": [],
    "eleven-penguins": [],
    "eval-chicken": [],
    "eval-dodge": [],
    "eval-chair": [],
    "lego": [],
    "boys-beach": [],
}

disable_selfattn_methods = {
    "parkour": ["fg1", "fg2"],
    "car-puddle": ["fg1", "fg2"],
    "camel": ["fg1", "fg2"],
    "boys-beach": ["fg2"],
    "puppy-walk": ["fg2"],
    "five-beagles": [],
}

window.HELP_IMPROVE_VIDEOJS = false;
function reload() {
    var videos = document.getElementsByClassName('item');
    for(var i = 0; i < videos.length; i++) {
        // videos[i].style.width = width;
    }
}

// window.addEventListener('DOMContentLoaded', () => {

//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         const id = entry.target.getAttribute('id');
//         if (entry.intersectionRatio > 0) {
//           document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
//         } else {
//           document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
//         }
//       });
//     });
  
//     // Track all sections that have an `id` applied
//     document.querySelectorAll('section[id]').forEach((section) => {
//       observer.observe(section);
//     });
    
//   });


function reload_carousel_videos() {
    console.log('reload');
    for (var i = 0; i < demo_items.length; i++) {
        var video_item = demo_items[i].querySelector('video');
        video_item.pause();
        video_item.currentTime = 0;
        video_item.load();
    }
}

function configure_carousel() {
    var options = {
            slidesToScroll: 1,
            slidesToShow: 3,
            loop: true,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 3000,
            pagination: false,
    }
    // Initialize all div with carousel class
    carousels = bulmaCarousel.attach('.carousel', options);
    
    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
        // Add listener to  event
        // carousels[i].reset();
        carousels[i].on('before:show', state => {
            console.log(state);
            reload_carousel_videos();
        });
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#item');
    if (element && element.bulmaCarousel) {
        // bulmaCarousel instance is available as element.bulmaCarousel
        element.bulmaCarousel.on('before-show', function(state) {
            console.log(state);
        });
    }
    
    bulmaSlider.attach();
    reload();
}


$(document).ready(function () {
    // $(function () {
    //     $('[data-toggle="tooltip"]').tooltip()
    // });

    demo_items = document.querySelector('#demo-carousel').querySelectorAll('.item');

    configure_carousel();

    // activeDemoMethodPill = $('.demo-method-pill').filter('.active')[0];
    activeDemoModePill = $('.demo-mode-pill').filter('.active')[0];
    activeDemoScenePill = $('.demo-scene-pill').filter('.active')[0];
    selectDemoVideo(null, activeDemoScenePill, activeDemoModePill);

    activeCompMethodPill = $('.comp-method-pill').filter('.active')[0];
    activeCompModePill = $('.comp-mode-pill').filter('.active')[0];
    activeCompScenePill = $('.comp-scene-pill').filter('.active')[0];
    selectCompVideo(activeCompMethodPill, activeCompScenePill, activeCompModePill);

    activeCompRmMethodPill = $('.comprm-method-pill').filter('.active')[0];
    activeCompRmModePill = $('.comprm-mode-pill').filter('.active')[0];
    activeCompRmScenePill = $('.comprm-scene-pill').filter('.active')[0];
    selectCompRmVideo(activeCompRmMethodPill, activeCompRmScenePill, activeCompRmModePill);

    // activeAblDataMethodPill = $('.abldata-method-pill').filter('.active')[0];
    // activeAblDataModePill = $('.abldata-mode-pill').filter('.active')[0];
    activeAblDataScenePill = $('.abldata-scene-pill').filter('.active')[0];
    selectAblDataVideo(activeAblDataMethodPill, activeAblDataScenePill, activeAblDataModePill);

    // activeAblCondMethodPill = $('.ablcond-method-pill').filter('.active')[0];
    // activeAblCondModePill = $('.ablcond-mode-pill').filter('.active')[0];
    activeAblCondScenePill = $('.ablcond-scene-pill').filter('.active')[0];
    selectAblCondVideo(activeAblCondMethodPill, activeAblCondScenePill, activeAblCondModePill);

    activeTrainDataMethodPill = $('.traindata-method-pill').filter('.active')[0];
    selectTrainDataVideo(activeTrainDataMethodPill, activeTrainDataScenePill, activeTrainDataModePill);

    activeTrimaskScenePill = $('.trimask-scene-pill').filter('.active')[0];
    selectTrimaskVideo(activeTrimaskMethodPill, activeTrimaskScenePill, activeTrimaskModePill);

    activeFailureScenePill = $('.failure-scene-pill').filter('.active')[0];
    selectFailureVideo(activeFailureMethodPill, activeFailureScenePill, activeFailureModePill);

    // activeT2VPriorScenePill = $('.t2vprior-scene-pill').filter('.active')[0];
    // selectT2VPriorVideo(activeT2VPriorMethodPill, activeT2VPriorScenePill, activeT2VPriorModePill);

    activeSelfAttnScenePill = $('.selfattn-scene-pill').filter('.active')[0];
    activeSelfAttnMethodPill = $('.selfattn-method-pill').filter('.active')[0];
    activeSelfAttnModePill = $('.selfattn-mode-pill').filter('.active')[0];
    selectSelfAttnVideo(activeSelfAttnMethodPill, activeSelfAttnScenePill, activeSelfAttnModePill);
    // $(".navbar-burger").click(function() {
    // // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    // $(".navbar-burger").toggleClass("is-active");
    // $(".navbar-menu").toggleClass("is-active");

    // });
});


function autoScroll(target_name) {
    // $(next_btn).trigger('click');
    console.log(demo_items.length);
    var target_idx = -1;
    for (var i = 0; i < demo_items.length; i++) {
        if (demo_items[i].querySelector('source').getAttribute('src').includes(target_name)) {
            target_idx = i;
        }
    }
    console.log(target_idx);
    if (target_idx >= 0) {
        carousels[0].state.next = Number(target_idx - 1);
        carousels[0].show(target_idx - 1);
    }
    reload_carousel_videos();
}

function selectDemoVideo(methodPill, scenePill, modePill) {
    // Your existing logic for video selection
    // var video = document.getElementById("compVideo");
    select = true;
    // console.log(methodPill, scenePill.getAttribute("data-value"), modePill);
    // if (activeDemoMethodPill) {
    //     activeDemoMethodPill.classList.remove("active");
    // }

    if (activeDemoScenePill) {
        activeDemoScenePill.classList.remove("active");
    }

    if (modePill) {
        activeDemoModePill.classList.remove("active");
        modePill.classList.add("active");
        activeDemoModePill = modePill;
    }

    // activeDemoMethodPill = methodPill;
    activeDemoScenePill = scenePill;
    scenePill.classList.add("active");
    pill = scenePill.getAttribute("data-value");
    mode = activeDemoModePill.getAttribute("data-value");
    // console.log(pill);
    // console.log("Pill: " + pill + " Mode: " + mode);

    // swap video to avoid flickering
    var video_active = document.getElementById("demoVideo0"); // + activeDemoVidID);
    // var video_hidden = document.getElementById("demoVideo" + (1 - activeDemoVidID));
    // video_active.src = "assets/videos/demo/" + mode + "/" + pill + ".mp4";
    // console.log(video_active)
    video_active.src = "assets/videos/layers/" + pill + ".mp4";
    // console.log("videos/results/" + mode + "/" + pill + ".mp4");
    video_active.load();

    autoScroll(pill.split('_')[0]);
}




function _selectCompVideo(methodPill, scenePill, modePill) {
    select = true;
    if (activeCompMethodPill) {
        activeCompMethodPill.classList.remove("active");
    }

    if (activeCompScenePill) {
        activeCompScenePill.classList.remove("active");
    }

    if (modePill) {
        activeCompModePill.classList.remove("active");
        modePill.classList.add("active");
        activeCompModePill = modePill;
    }

    activeCompMethodPill = methodPill;
    activeCompScenePill = scenePill;
    scenePill.classList.add("active");
    activeCompMethodPill.classList.add("active");
    pill = scenePill.getAttribute("data-value");
    method = activeCompMethodPill.getAttribute("data-value");
    mode = activeCompModePill.getAttribute("data-value");
    
    // var label = methodPill.getAttribute("label");
    // var label_baseline = document.getElementById("label-comp-baseline");
    // label_baseline.innerHTML = label;

    // display/hide method buttons
    disable_list = disable_methods[pill]
    btn_methods = {
        "omnimatte": document.getElementById("btn-omnimatte"),
        "omnimatte3d": document.getElementById("btn-omnimatte3d"),
        "omnimatterf": document.getElementById("btn-omnimatterf"),
        "factormatte": document.getElementById("btn-factormatte"),
    }
    show_alternate_btn = null;
    for (var [btn_name, btn_method] of Object.entries(btn_methods)) {
        is_diabled = false
        for (var i = 0; i < disable_list.length; i++) {
            if (disable_list[i] == btn_name) {
                is_diabled = true;
                break;
            }
        } 
        if (is_diabled) {
            btn_method.style.display = "none";
        } else {
            btn_method.style.display = "inline-flex";
            show_alternate_btn = btn_method;
        }
    }
    
    if (activeCompMethodPill.style.display == "none") {
        selectCompVideo(show_alternate_btn, scenePill, modePill);
    }

    // display hide layers
    disable_list = disable_modes[pill]
    btn_modes = {
        'fg1': document.getElementById("btn-comp-fg1"),
        'alpha1': document.getElementById("btn-comp-alpha1"),
        'fg2': document.getElementById("btn-comp-fg2"),
        'alpha2': document.getElementById("btn-comp-alpha2"),
        'fg3': document.getElementById("btn-comp-fg3"),
        'alpha3': document.getElementById("btn-comp-alpha3"),
    }
    show_alternate_btn = null;
    for (var [btn_name, btn_mode] of Object.entries(btn_modes)) {
        is_diabled = false
        for (var i = 0; i < disable_list.length; i++) {
            if (disable_list[i] == btn_name) {
                is_diabled = true;
                break;
            }
        } 
        if (is_diabled) {
            btn_mode.style.display = "none";
        } else {
            btn_mode.style.display = "inline-flex";
            if (show_alternate_btn == null) {
                show_alternate_btn = btn_mode;
            }
        }
    }
    
    if (activeCompModePill.style.display == "none") {
        selectCompVideo(activeCompMethodPill, scenePill, show_alternate_btn);
    }
    ////
    // var video_active = document.getElementById("compVideo0");
    // video_active.src = "assets/videos/comparisons-omnimatte/" + pill + "-" + method + "-" + mode + "-tuple.mp4";
    // video_active.load();

    load_comparison_videos(pill, method, mode);
}

function selectCompVideo(methodPill, scenePill, modePill) {
    select = true;
    if (activeCompMethodPill) {
        activeCompMethodPill.classList.remove("active");
    }

    if (activeCompScenePill) {
        activeCompScenePill.classList.remove("active");
    }

    if (modePill) {
        activeCompModePill.classList.remove("active");
        modePill.classList.add("active");
        activeCompModePill = modePill;
    }

    activeCompMethodPill = methodPill;
    activeCompScenePill = scenePill;
    scenePill.classList.add("active");
    activeCompMethodPill.classList.add("active");
    pill = scenePill.getAttribute("data-value");
    method = activeCompMethodPill.getAttribute("data-value");
    mode = activeCompModePill.getAttribute("data-value");
    
    // var label = methodPill.getAttribute("label");
    // var label_baseline = document.getElementById("label-comp-baseline");
    // label_baseline.innerHTML = label;

    // display/hide method buttons
    disable_list = disable_methods[pill]
    // btn_methods = {
    //     "omnimatte": document.getElementById("btn-omnimatte"),
    //     "omnimatte3d": document.getElementById("btn-omnimatte3d"),
    //     "omnimatterf": document.getElementById("btn-omnimatterf"),
    //     "factormatte": document.getElementById("btn-factormatte"),
    // }
    // show_alternate_btn = null;
    // for (var [btn_name, btn_method] of Object.entries(btn_methods)) {
    //     is_diabled = false
    //     for (var i = 0; i < disable_list.length; i++) {
    //         if (disable_list[i] == btn_name) {
    //             is_diabled = true;
    //             break;
    //         }
    //     } 
    //     if (is_diabled) {
    //         btn_method.style.display = "none";
    //     } else {
    //         btn_method.style.display = "inline-flex";
    //         show_alternate_btn = btn_method;
    //     }
    // }
    
    // if (activeCompMethodPill.style.display == "none") {
    //     selectCompVideo(show_alternate_btn, scenePill, modePill);
    // }

    label_methods = {
        "omnimatte": document.getElementById("label-comp-omnimatte"),
        "omnimatte3d": document.getElementById("label-comp-omnimatte3d"),
        "omnimatterf": document.getElementById("label-comp-omnimatterf"),
        "factormatte": document.getElementById("label-comp-factormatte"),
    }
    for (var [btn_name, btn_method] of Object.entries(label_methods)) {
        is_diabled = false
        for (var i = 0; i < disable_list.length; i++) {
            if (disable_list[i] == btn_name) {
                is_diabled = true;
                break;
            }
        } 
        if (is_diabled) {
            btn_method.style.display = "none";
        } else {
            btn_method.style.display = "block";
        }
    }

    var div_video = document.getElementById("div-video-comp-omni");
    if (pill == "eval-cars" || pill.includes("factormatte") || pill == 'omnimatte-rf-walk') {
        div_video.style.marginLeft = "0%";
        div_video.style.width = "100%";
    } else {
        div_video.style.marginLeft = "calc(-45vw + 50%)";
        div_video.style.width = "90vw";
    }

    // display hide layers
    disable_list = disable_modes[pill]
    btn_modes = {
        'fg1': document.getElementById("btn-comp-fg1"),
        'alpha1': document.getElementById("btn-comp-alpha1"),
        'fg2': document.getElementById("btn-comp-fg2"),
        'alpha2': document.getElementById("btn-comp-alpha2"),
        'fg3': document.getElementById("btn-comp-fg3"),
        'alpha3': document.getElementById("btn-comp-alpha3"),
    }
    show_alternate_btn = null;
    for (var [btn_name, btn_mode] of Object.entries(btn_modes)) {
        is_diabled = false
        for (var i = 0; i < disable_list.length; i++) {
            if (disable_list[i] == btn_name) {
                is_diabled = true;
                break;
            }
        } 
        if (is_diabled) {
            btn_mode.style.display = "none";
        } else {
            btn_mode.style.display = "inline-flex";
            if (show_alternate_btn == null) {
                show_alternate_btn = btn_mode;
            }
        }
    }
    
    if (activeCompModePill.style.display == "none") {
        selectCompVideo(activeCompMethodPill, scenePill, show_alternate_btn);
    }
    ////
    var video_active = document.getElementById("compVideo0");
    // video_active.src = "assets/videos/comparisons-omnimatte/" + pill + "-" + method + "-" + mode + "-tuple.mp4";
    video_active.src = "assets/videos/comparisons_omnimatte/" + pill + "-" + mode + "-row.mp4";
    video_active.load();

    // load_comparison_videos(pill, method, mode);
}

// function load_comparison_videos(scene, method, mode) {
//     var vidIn = document.getElementById('compVideoIn');
//     var vidBase = document.getElementById('compVideoBaseline');
//     var vidOurs = document.getElementById('compVideoOurs');
//     vidIn.src = "assets/videos/comparisons_omnimatte/" + scene + "-input-bg.mp4";
//     vidBase.src = "assets/videos/comparisons_omnimatte/" + scene + "-" + method + "-" + mode + ".mp4";
//     vidOurs.src = "assets/videos/comparisons_omnimatte/" + scene + "-ours-" + mode + ".mp4";
//     syncComparisonVideos();
// }



// function syncComparisonVideos() {
//     console.log('sync!');
//     var vidIn = document.getElementById('compVideoIn');
//     var vidBase = document.getElementById('compVideoBaseline');
//     var vidOurs = document.getElementById('compVideoOurs');
//     vidIn.pause();
//     vidIn.currentTime = 0;
//     vidIn.load();
//     vidBase.pause();
//     vidBase.currentTime = 0;
//     vidBase.load();
//     vidOurs.pause();
//     vidOurs.currentTime = 0;
//     vidOurs.load();
// }


function selectCompRmVideo(methodPill, scenePill, modePill) {
    select = true;
    if (activeCompRmMethodPill) {
        activeCompRmMethodPill.classList.remove("active");
    }

    if (activeCompRmScenePill) {
        activeCompRmScenePill.classList.remove("active");
    }

    if (modePill) {
        activeCompRmModePill.classList.remove("active");
        modePill.classList.add("active");
        activeCompRmModePill = modePill;
    }

    activeCompRmMethodPill = methodPill;
    activeCompRmScenePill = scenePill;
    scenePill.classList.add("active");
    activeCompRmMethodPill.classList.add("active");
    pill = scenePill.getAttribute("data-value");
    method = activeCompRmMethodPill.getAttribute("data-value");
    mode = activeCompRmModePill.getAttribute("data-value");
    
    // var label = methodPill.getAttribute("label");
    // var label_baseline = document.getElementById("label-comprm-baseline");
    // label_baseline.innerHTML = label;

    // display/hide method buttons
    // disable_list = disable_objrm_methods[pill]
    // btn_methods = {
    //     "objectdrop": document.getElementById("btn-objectdrop"),
    //     "propainter": document.getElementById("btn-propainter"),
    //     "lumiere": document.getElementById("btn-lumiere"),
    // }
    // show_alternate_btn = null;
    // for (var [btn_name, btn_method] of Object.entries(btn_methods)) {
    //     is_diabled = false
    //     for (var i = 0; i < disable_list.length; i++) {
    //         if (disable_list[i] == btn_name) {
    //             is_diabled = true;
    //             break;
    //         }
    //     } 
    //     if (is_diabled) {
    //         btn_method.style.display = "none";
    //     } else {
    //         btn_method.style.display = "inline-flex";
    //         show_alternate_btn = btn_method;
    //     }
    // }
    
    // if (activeCompRmMethodPill.style.display == "none") {
    //     selectCompRmVideo(show_alternate_btn, scenePill, modePill);
    // }
    ////
    var div_video = document.getElementById("div-video-comp-remove");
    if (pill == "eval-chair" ) {
        div_video.style.marginLeft = "0%";
        div_video.style.width = "100%";
    } else {
        div_video.style.marginLeft = "calc(-45vw + 50%)";
        div_video.style.width = "90vw";
    }
    var video_active = document.getElementById("comprmVideo0");
    console.log(video_active)
    // video_active.src = "assets/videos/comparisons-removal/" + pill + "-" + method + "-" + mode + "-tuple.mp4";
    video_active.src = "assets/videos/comparisons-removal/" + pill + "-row.mp4";
    video_active.load();
}

function selectAblDataVideo(methodPill, scenePill, modePill) {
    select = true;
    if (activeAblDataScenePill) {
        activeAblDataScenePill.classList.remove("active");
    }

    activeAblDataScenePill = scenePill;
    scenePill.classList.add("active");
    pill = scenePill.getAttribute("data-value");

    var video_active = document.getElementById("abldataVideo0");
    video_active.src = "assets/videos/ablation_data/" + pill + "with-mask_mask-dilated.mp4";
    video_active.load();
}

function selectAblCondVideo(methodPill, scenePill, modePill) {
    select = true;

    if (activeAblCondScenePill) {
        activeAblCondScenePill.classList.remove("active");
    }

    activeAblCondScenePill = scenePill;
    scenePill.classList.add("active");
    pill = scenePill.getAttribute("data-value");
    var video_active = document.getElementById("ablcondVideo0");
    console.log(video_active)
    video_active.src = "assets/videos/ablation_condition/" + pill + "_mask-dilated.mp4";
    video_active.load();
}

function selectTrainDataVideo(methodPill, scenePill, modePill) {
    select = true;

    if (activeTrainDataMethodPill) {
        activeTrainDataMethodPill.classList.remove("active");
    }

    activeTrainDataMethodPill = methodPill;
    methodPill.classList.add("active");
    pill = methodPill.getAttribute("data-value");
    let train_data_desc = {
        "omnimatte": "We collect omnimatte results from existing omnimatte methods (Omnimatte, Omnimatte3D, and OmnimatteRF) to provide examples of cause-and-effect relationships in real videos.",
        "tripod": "The Tripod dataset consists of videos captured with stationary cameras, providing pseudo-examples of more complex real-world scenarios, such as water effects and dynamic backgrounds.",
        "kubric": "We use Kubric to synthesize multi-object scenes with diverse reflections and shadows. we observe that many real-world scenarios exhibit multiple instances of the same object type in a scene, such as dogs, pedestrians, or vehicles. Therefore, we generate scenes with duplicated objects to train the model to handle multiple similar objects. <br><br>For the synthesized Kubric and Object-Paste data, we randomly switch the gray and white colors to encourage the model to learn background preservation and inpainting for gray-labeled regions. The training data is augmented through horizontal and temporal flipping, as well as random cropping.",
        "objectpaste": "We segment objects from real videos and paste them onto target real videos to strengthen the model’s inpainting capabilities and background preservation. <br><br>For the synthesized Kubric and Object-Paste data, we randomly switch the gray and white colors to encourage the model to learn background preservation and inpainting for gray-labeled regions. The training data is augmented through horizontal and temporal flipping, as well as random cropping.",
    }[pill]
    var p_desc = document.getElementById("p-traindata-desc");
    p_desc.innerHTML = train_data_desc;

    var video_active = document.getElementById("traindataVideo0");
    video_active.src = "assets/videos/train_data/" + pill + ".mp4";
    video_active.load();
}

function selectTrimaskVideo(methodPill, scenePill, modePill) {
    select = true;

    if (activeTrimaskScenePill) {
        activeTrimaskScenePill.classList.remove("active");
    }

    activeTrimaskScenePill = scenePill;
    scenePill.classList.add("active");
    pill = scenePill.getAttribute("data-value");
    var video_active = document.getElementById("trimaskVideo0");
    video_active.src = "assets/videos/trimask/" + pill + ".mp4";
    video_active.load();
}

function selectT2VPriorVideo(methodPill, scenePill, modePill) {
    select = true;

    if (activeT2VPriorScenePill) {
        activeT2VPriorScenePill.classList.remove("active");
    }

    activeT2VPriorScenePill = scenePill;
    scenePill.classList.add("active");
    pill = scenePill.getAttribute("data-value");
    var video_active = document.getElementById("t2vpriorVideo0");
    video_active.src = "assets/videos/t2v_prior/" + pill + ".mp4";
    video_active.load();
}

function selectSelfAttnVideo(methodPill, scenePill, modePill) {
    select = true;
    if (activeSelfAttnScenePill) {
        activeSelfAttnScenePill.classList.remove("active");
    }
    if (activeSelfAttnMethodPill) {
        activeSelfAttnMethodPill.classList.remove("active");
    }
    if (activeSelfAttnModePill) {
        activeSelfAttnModePill.classList.remove("active");
    }

    activeSelfAttnScenePill = scenePill;
    activeSelfAttnMethodPill = methodPill;
    activeSelfAttnModePill = modePill;
    scenePill.classList.add("active");
    methodPill.classList.add("active");
    modePill.classList.add("active");
    pill = scenePill.getAttribute("data-value");
    fg = methodPill.getAttribute("data-value");
    block = modePill.getAttribute("data-value");

    // display hide layers
    disable_list = disable_selfattn_methods[pill]
    btn_methods = {
        'fg0': document.getElementById("btn-selfattn-fg0"),
        'fg1': document.getElementById("btn-selfattn-fg1"),
        'fg2': document.getElementById("btn-selfattn-fg2"),
    }
    show_alternate_btn = null;
    for (var [btn_name, btn_method] of Object.entries(btn_methods)) {
        is_diabled = false
        for (var i = 0; i < disable_list.length; i++) {
            if (disable_list[i] == btn_name) {
                is_diabled = true;
                break;
            }
        } 
        if (is_diabled) {
            btn_method.style.display = "none";
        } else {
            btn_method.style.display = "inline-flex";
            if (show_alternate_btn == null) {
                show_alternate_btn = btn_method;
            }
        }
    }
    if (activeSelfAttnMethodPill.style.display == "none") {
        selectSelfAttnVideo(show_alternate_btn, scenePill, modePill);
    }

    var video_active = document.getElementById("selfattnVideo0");
    video_active.src = "assets/videos/self-attn-analysis/" + pill + "_" + fg + "_" + block + ".mp4";
    video_active.load();
}


function selectFailureVideo(methodPill, scenePill, modePill) {
    select = true;

    if (activeFailureScenePill) {
        activeFailureScenePill.classList.remove("active");
    }

    activeFailureScenePill = scenePill;
    scenePill.classList.add("active");
    pill = scenePill.getAttribute("data-value");

    let failure_desc = {
        "trampoline": "Omnimatte layers handle color blending but are not designed to capture shape deformations as object effects. Because of this limitation, we focused on training Casper to remove color-related effects (i.e., shadows and reflections), so it may struggle to remove physical interactions with the environment",
        "dog-agility": "Omnimatte layers handle color blending but are not designed to capture shape deformations as object effects. Because of this limitation, we focused on training Casper to remove color-related effects (i.e., shadows and reflections), so it may struggle to remove physical interactions with the environment",
        "five-beagles": "The removal model may not always produce the desired outcome, particularly in challenging multi-object cases.",
        "bowling": "The removal model may not always produce the desired outcome, particularly in challenging multi-object cases.",
        "dog-crosswalk": "The smaller dog is initially invisible, posing a challenge for our Casper model to complete the dog without reference to previous frames. Furthermore, the challenging reflection effects on the crosswalk and road further complicate the removal process. Casper could remove the reflection of the person but leave the larger dog's reflection on the road.",
    }[pill]
    var p_desc = document.getElementById("p-failure-desc");
    p_desc.innerHTML = failure_desc;

    var video_active = document.getElementById("failureVideo0");
    video_active.src = "assets/videos/failures/" + pill + ".mp4";
    video_active.load();
}

var isUserSpecifiedZoomed = false;
function zoomUserSpecified() {
    var div1 = document.querySelector('#div-userspecified-overview');
    var div2 = document.querySelector('#div-userspecified-zoom');
    var btn = document.querySelector('#btn-userspecified');
    if (isUserSpecifiedZoomed) {
        isUserSpecifiedZoomed = false;
        div1.style.display = 'block';
        div2.style.display = 'none';
        btn.classList.remove('active');
        btn.innerHTML = 'Click to zoom in'
    } else {
        isUserSpecifiedZoomed = true;
        div2.style.display = 'block';
        div1.style.display = 'none';
        btn.classList.add('active');
        btn.innerHTML = 'Back'
    }
}


