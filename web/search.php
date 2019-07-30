<?php
include('php/includes.php');
session_start();
if(isset($_SESSION['5029893130'])||isset($_SESSION['anon'])){?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Matsugen - Sök</title>
        <meta charset="UTF-8">
        <meta name="description" content="Matsugen.se">
        <meta name="viewport" content="width=device-width, initial-scale=0.9">
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <link rel="icon" href="">
        <link rel="apple-touch-icon" href="">
        <script src="js/jquery-3.2.1.js"></script>
        <script src="../staticalVariables/REST.js"></script>
        <script src="js/includes.js"></script>
        <script src="js/global.js"></script>
        <script src="js/search.js"></script>
    </head>
    <body id="trueSearchBody" class="hideSideBar">
    <header class="header">
        <?php include('includes/menu.php');?>
    </header>
    <div class="body" id="searchBody">
        <div class="sectionLeft categoryDivClass resizeSectionLeft resizeMargin" id="categoryDiv">
            <p>Kategori</p>
            <div id="categoryObjJs">

            </div>
            <a class="opacity05 txt14" id="clearCategory" onclick="clearCategory()">x Rensa alla alternativ</a>
        </div>
        <div class="sectionCenter" id="resultsWrapper">
            <div id="filterDiv">
                <a class="filterA" id="filterA">Sortera:</a>
                <div id="filterOptions">
                    <a class="filterA" id="popularity" onclick="sortPopularity()">Popularitet</a>
                    <a class="filterA" id="avgScore" onclick="sortAvg()">Snittbetyg</>
                    <a class="filterA" id="reviews" onclick="sortReviews()">Antal omdömen</a>
                    <a class="filterA" id="name" onclick="sortName()">Namn</a>
                </div>
            </div>
            <div class="contentDiv">
                <div class="oneElement"> <p class="txt20 txtBlue">Annons</p> </div>
                <div class="oneElement"> <p class="txt20 txtBlue">Annons</p> </div>
                <div class="oneElement"> <p class="txt20 txtBlue">Annons</p> </div>
            </div>
            <div class="resultsDiv" id="resultObjId"></div>
            <div class="resultsDiv" id="resultNoMatch">
            </div>
        </div>
    </div>
    <footer class='footer'>
        <?php include('includes/footer.html');?>
    </footer>
    <?php include('includes/popups.html');?>
    <!--Start of Tawk.to Script-->
    <script type="text/javascript">
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/59e4c2bb4854b82732ff5dda/default';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
        })();
    </script>
    <!--End of Tawk.to Script-->
    </body>
    </html>
<?php
}
else{
    header("Location:" . $_baseUrlWeb . $_indexPath);
}
?>
