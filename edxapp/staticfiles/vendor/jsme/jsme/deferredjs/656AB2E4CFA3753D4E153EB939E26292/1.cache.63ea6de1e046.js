var tP="3",uP="Any",vP="Aromatic",wP="Nonring",xP="Reset",yP="Ring";function zP(){zP=r;AP=new gp(dd,new BP)}function BP(){}q(215,212,{},BP);_.Tc=function(a){Ix();ZL(this,a.b,CP(a.a.a,a.a.a.ob.selectedIndex))};_.Wc=function(){return AP};var AP;function DP(a,b){if(0>b||b>=a.ob.options.length)throw new zu;}function CP(a,b){DP(a,b);return a.ob.options[b].value}function EP(){rv();this.ob=$doc.createElement("select");this.ob[fd]="gwt-ListBox"}q(361,339,xh,EP);function FP(){FP=r}
function GP(a,b){if(null==b)throw new Yq("Missing message: awt.103");var c=-1,d,e,f;f=a.mc.a.ob;e=$doc.createElement(qf);e.text=b;e.removeAttribute("bidiwrapped");e.value=b;d=f.options.length;(0>c||c>d)&&(c=d);c==d?f.add(e,null):(c=f.options[c],f.add(e,c))}function HP(){FP();Hx.call(this);new Ai;this.mc=new IP((Ix(),this))}q(428,415,{90:1,92:1,99:1,111:1,117:1},HP);_.fe=function(){return Mx(this.mc,this)};
_.ue=function(){return(null==this.jc&&(this.jc=tx(this)),this.jc)+xa+this.uc+xa+this.vc+xa+this.rc+Qg+this.hc+(this.qc?l:",hidden")+",current="+CP(this.mc.a,this.mc.a.ob.selectedIndex)};function JP(){xL.call(this,7)}q(441,1,di,JP);function MP(a){zL.call(this,a,0)}q(446,415,Dh,MP);function NP(a){var b=a.j;YL(a.mc.c,b.a,b.b);!vx(a)&&SK(a);NK(a)}
function OP(a,b,c){VL.call(this);this.mc&&sL(this.mc.c,!1);pL(this,!1);Vx(this,new xL(0));a=new zL(a,1);$(this,a,null);a=new $x;$(a,this.i,null);$(this,a,null);b&&(this.j=wx(b),oL(this),UL(this.j,~~(G(b.$b.ob,nf)/2)-~~(this.rc/2),~~(G(b.$b.ob,mf)/2)-~~(this.hc/2)));c&&Z(this,c)}q(574,575,LH,OP);_.og=function(){return"OK"};q(580,581,Eh);_.Pc=function(){NP(new OP(this.b,this.a,(PA(),RA)))};q(583,581,Eh);_.Pc=function(){!this.a.Ib?this.a.Ib=new PP(this.a):this.a.Ib.mc.c.gb?MM(this.a.Ib.mc.c):NP(this.a.Ib)};
function QP(a,b){JK(b)==a.a?Z(b,(sy(),By)):Z(b,a.a)}
function RP(a){var b,c,d,e;e=l;d=!1;JK(SP)!=a.a?(e=va,d=!0):JK(TP)!=a.a?(e="!#6",d=!0):JK(UP)!=a.a?(Z(VP,(sy(),By)),Z(WP,By),Z(XP,By),Z(YP,By),e="F,Cl,Br,I"):(b=JK(ZP)!=a.a,c=JK($P)!=a.a,JK(aQ)!=a.a&&(b?e+="c,":c?e+="C,":e+="#6,"),JK(bQ)!=a.a&&(b?e+="n,":c?e+="N,":e+="#7,"),JK(cQ)!=a.a&&(b?e+="o,":c?e+="O,":e+="#8,"),JK(dQ)!=a.a&&(b?e+="s,":c?e+="S,":e+="#16,"),JK(eQ)!=a.a&&(b?e+="p,":c?e+="P,":e+="#15,"),JK(VP)!=a.a&&(e+="F,"),JK(WP)!=a.a&&(e+="Cl,"),JK(XP)!=a.a&&(e+="Br,"),JK(YP)!=a.a&&(e+="I,"),
LE(e,xa)&&(e=e.substr(0,e.length-1-0)),1>e.length&&!a.b&&(b?e=pc:c?e=rb:(Z(SP,(sy(),By)),e=va)));b=l;d&&JK(ZP)!=a.a&&(b+=";a");d&&JK($P)!=a.a&&(b+=";A");JK(fQ)!=a.a&&(b+=";R");JK(gQ)!=a.a&&(b+=";!R");JK(SP)!=a.a&&0<b.length?e=b.substr(1,b.length-1):e+=b;d=hQ.mc.a.ob.selectedIndex;0<d&&(--d,e+=";H"+d);d=iQ.mc.a.ob.selectedIndex;0<d&&(--d,e+=";D"+d);JK(jQ)!=a.a&&(e="~");JK(kQ)!=a.a&&(e=hb);JK(lQ)!=a.a&&(e=qb);JK(mQ)!=a.a&&(e="!@");CL(a.e,e)}
function nQ(a){oQ(a);pQ(a);var b=hQ.mc.a;DP(b,0);b.ob.options[0].selected=!0;b=iQ.mc.a;DP(b,0);b.ob.options[0].selected=!0;Z(ZP,a.a);Z($P,a.a);Z(fQ,a.a);Z(gQ,a.a);Z(hQ,a.a);Z(iQ,a.a);qQ(a)}function oQ(a){Z(aQ,a.a);Z(bQ,a.a);Z(cQ,a.a);Z(dQ,a.a);Z(eQ,a.a);Z(VP,a.a);Z(WP,a.a);Z(XP,a.a);Z(YP,a.a)}function pQ(a){Z(SP,a.a);Z(TP,a.a);Z(UP,a.a)}function qQ(a){Z(jQ,a.a);Z(kQ,a.a);Z(lQ,a.a);Z(mQ,a.a);a.b=!1}
function PP(a){qL.call(this,"Atom/Bond Query");this.i=new jL(this.og());ly(this.q,new WL(this));this.a=(PA(),RA);this.c=a;this.d||(a=wx(a),this.d=new BL(a),UL(this.d,-150,10));this.j=this.d;Vx(this,new JP);Z(this,this.a);a=new $x;Vx(a,new Sy(0,3,1));$(a,new MP("Atom type :"),null);SP=new jL(uP);TP=new jL("Any except C");UP=new jL("Halogen");$(a,SP,null);$(a,TP,null);$(a,UP,null);$(this,a,null);a=new $x;Vx(a,new Sy(0,3,1));$(a,new zL("Or select one or more from the list :",0),null);$(this,a,null);
a=new $x;Vx(a,new Sy(0,3,1));aQ=new jL(wb);bQ=new jL(Rb);cQ=new jL(Vb);dQ=new jL(cc);eQ=new jL(Wb);VP=new jL(Gb);WP=new jL(Ab);XP=new jL(vb);YP=new jL(Kb);$(a,aQ,null);$(a,bQ,null);$(a,cQ,null);$(a,dQ,null);$(a,eQ,null);$(a,VP,null);$(a,WP,null);$(a,XP,null);$(a,YP,null);$(this,a,null);a=new $x;Vx(a,new Sy(0,3,1));hQ=new HP;GP(hQ,uP);GP(hQ,$a);GP(hQ,db);GP(hQ,gb);GP(hQ,tP);$(a,new MP("Number of hydrogens :  "),null);$(a,hQ,null);$(this,a,null);a=new $x;Vx(a,new Sy(0,3,1));iQ=new HP;GP(iQ,uP);GP(iQ,
$a);GP(iQ,db);GP(iQ,gb);GP(iQ,tP);GP(iQ,"4");GP(iQ,"5");GP(iQ,"6");$(a,new zL("Number of connections :",0),null);$(a,iQ,null);$(a,new zL(" (H's don't count.)",0),null);$(this,a,null);a=new $x;Vx(a,new Sy(0,3,1));$(a,new MP("Atom is :"),null);ZP=new jL(vP);$(a,ZP,null);$P=new jL("Nonaromatic");$(a,$P,null);fQ=new jL(yP);$(a,fQ,null);gQ=new jL(wP);$(a,gQ,null);$(this,a,null);a=new $x;Z(a,Iy(JK(this)));Vx(a,new Sy(0,3,1));$(a,new MP("Bond is :"),null);jQ=new jL(uP);$(a,jQ,null);kQ=new jL(vP);$(a,kQ,
null);lQ=new jL(yP);$(a,lQ,null);mQ=new jL(wP);$(a,mQ,null);$(this,a,null);a=new $x;Vx(a,new Sy(1,3,1));this.e=new wz(va,20);$(a,this.e,null);$(a,new jL(xP),null);$(a,this.i,null);$(this,a,null);this.mc&&sL(this.mc.c,!1);pL(this,!1);oQ(this);pQ(this);qQ(this);Z(ZP,this.a);Z($P,this.a);Z(fQ,this.a);Z(gQ,this.a);Z(hQ,this.a);Z(iQ,this.a);QP(this,SP);oL(this);a=this.j;YL(this.mc.c,a.a,a.b);!vx(this)&&SK(this);NK(this)}q(593,575,LH,PP);
_.pg=function(a,b){var c;H(b,xP)?(nQ(this),QP(this,SP),RP(this)):D(a.f,89)?(qQ(this),Fr(a.f)===Fr(SP)?(oQ(this),pQ(this)):Fr(a.f)===Fr(TP)?(oQ(this),pQ(this)):Fr(a.f)===Fr(UP)?(oQ(this),pQ(this)):Fr(a.f)===Fr(fQ)?Z(gQ,this.a):Fr(a.f)===Fr(gQ)?(Z(fQ,this.a),Z(ZP,this.a)):Fr(a.f)===Fr(ZP)?(Z($P,this.a),Z(gQ,this.a)):Fr(a.f)===Fr($P)?Z(ZP,this.a):Fr(a.f)===Fr(jQ)||Fr(a.f)===Fr(kQ)||Fr(a.f)===Fr(lQ)||Fr(a.f)===Fr(mQ)?(nQ(this),this.b=!0):pQ(this),QP(this,a.f),RP(this)):D(a.f,90)&&(qQ(this),c=a.f,0==c.mc.a.ob.selectedIndex?
Z(c,this.a):Z(c,(sy(),By)),RP(this));107!=this.c.e&&(this.c.e=107,ey(this.c));return!0};_.qg=function(){return Pm(this.e.mc.a.ob,Kg)};_.rg=function(){return this.b};_.b=!1;_.c=null;_.d=null;var SP=_.e=null,jQ=null,TP=null,ZP=null,kQ=null,XP=null,aQ=null,iQ=null,hQ=null,WP=null,VP=null,UP=null,YP=null,bQ=null,$P=null,gQ=null,mQ=null,cQ=null,eQ=null,fQ=null,lQ=null,dQ=null;function IP(a){TG();VG.call(this);this.a=new EP;gu(this.a,new rQ(this,a),(zP(),zP(),AP))}q(639,637,{},IP);_.Oe=function(){return this.a};
_.a=null;function rQ(a,b){this.a=a;this.b=b}q(640,1,{},rQ);_.a=null;_.b=null;X(574);X(593);X(428);X(639);X(640);X(361);X(215);x(KH)(1);