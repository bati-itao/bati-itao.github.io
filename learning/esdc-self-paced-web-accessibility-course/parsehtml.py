import re
import os
from bs4 import BeautifulSoup

CLEANR = re.compile('<.*?>') 


def cleanhtml(raw_html):
  cleantext = re.sub(CLEANR, '', raw_html)
  return re.sub('\s+',' ',cleantext).replace("\"","'")
    

f2 = open("index-fr.js", "a" , encoding="utf8")
f2.write("const indexJSON = [")
for folder in os.listdir():
    if os.path.isdir(folder):
        for filename in os.listdir(folder):
             if filename.endswith('.html'):
                if "-fr" in filename and not "example" in filename and not "sitemap" in filename and not "wcag" in filename:
                     fname = os.path.join(folder+"/",filename)
                     print(fname)
                     with open(fname, encoding="utf8") as f:
                        parsed_html = BeautifulSoup(f.read())
                        for section in parsed_html.body.find_all("section"):
                            for heading in  section.find_all(["h2"]):
                                if(heading.text != 'Table of contents' and heading.text != 'Pagination menu' and heading.text != 'Section menu'):
                                    json_str = ",{\n categories: '"+folder+"',\n content: \" " + cleanhtml(section.text) +"\",\n href: '../"+folder+"/"+filename+"#"+heading.get('id')+"'  ,\n title: \""+cleanhtml(parsed_html.title.string)+"\" ,\n heading: \" " + cleanhtml(heading.text)+ "\"\n}"
                                    f2.write(json_str)
                    
   
f2.write("]")
f2.close()
