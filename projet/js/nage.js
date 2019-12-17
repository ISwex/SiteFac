   $(document).ready(function(){
   	alert("Si vous passez votre souris sur les GIF situez en bas de page un appercu des muscles sollicités pendant les différentes nages est disponible.")
    $("#brassemuscle").hide();
    $("#papillonmuscle").hide();
    $("#dosmuscle").hide();
    $("#crawlmuscle").hide();
    $("#culbute").hide();

   $("#brasse").hover(function(){
   $("#brasse").hide();
   $("#brassemuscle").show();
  }); 
   $("#papillon").hover(function(){
   $("#papillon").hide();
   $("#papillonmuscle").show();
  });
   $("#dos").hover(function(){
   $("#dos").hide();
   $("#dosmuscle").show();
  });
   $("#crawl").hover(function(){
   $("#crawl").hide();
   $("#crawlmuscle").show();
  });
   $("#plongeon").hover(function(){
   $("#plongeon").hide();
   $("#culbute").show();
  });
});

