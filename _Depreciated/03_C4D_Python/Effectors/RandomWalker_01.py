
# Expresso Mechanic, Cinema 4D Python Tutorial 18: Random Walker Effector: https://youtu.be/SC42p7cx6dI

import c4d
import random

op: c4d.BaseObject # The python effector
gen: c4d.BaseObject # The MoGraph Generator executing the effector
doc: c4d.documents.BaseDocument # The document evaluating this effector
thread: c4d.threading.BaseThread # The thread executing this effector

def main() -> bool:
    # Called when the effector is executed to set MoGraph data. Similar to EffectorData::ModifyObject in C++.
    moData = c4d.modules.mograph.GeGetMoData(op)
    if moData is None:
        return False

    cnt = moData.GetCount()
    marr = moData.GetArray(c4d.MODATA_MATRIX)


    frame = doc.GetTime().GetFrame(doc.GetFps())
    
    global x, y, z, updated

    
    hasField = op[c4d.FIELDS].HasContent()
    fall = moData.GetFalloffs()
    

    def walk():
        for i in range(cnt):
            marr[i] = updated[i]
            x = updated[i].off.x
            y = updated[i].off.y
            z = updated[i].off.z
        
            if frame % op[c4d.ID_USERDATA,2] ==0:
                rnd = random.randint(0,5)
                if rnd ==0:
                    x+=op[c4d.ID_USERDATA,5]
                    
                if rnd ==1:
                    x-=op[c4d.ID_USERDATA,6] 
                    
                if rnd ==2:
                    y+=op[c4d.ID_USERDATA,7]
                    
                if rnd ==3:
                    y-=op[c4d.ID_USERDATA,8] 
                    
                if rnd ==4:
                    z+=op[c4d.ID_USERDATA,9]
                    
                if rnd ==5:
                    z-=op[c4d.ID_USERDATA,10]     
                                      
            updated[i].off = c4d.Vector(x,y,z)
            
    if frame==0:
        updated = marr      
    walk()                                                   

    moData.SetArray(c4d.MODATA_MATRIX, marr, hasField)
    return True