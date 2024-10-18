# Setup
# Cloner > Cube > Transform - Display - Index 
# Python Effector - Full control > Python Console

# Each clone has its own matrix (Collection of vectors)



import c4d
from c4d.modules import mograph as mo 

def main() -> bool:
    # Called when the effector is executed to set MoGraph data. Similar to EffectorData::ModifyObject in C++.
    moData = c4d.modules.mograph.GeGetMoData(op)
    if moData is None:
        return False

    cnt = moData.GetCount()
    marr = moData.GetArray(c4d.MODATA_MATRIX)
    
    hasField = op[c4d.FIELDS].HasContent()
    fall = moData.GetFalloffs()

#############################################
    # Part 1 Selecting a single element
    n = 20

    # Position: Vector to Real
    x = marr[n].off.x 
    y = 20
    z = marr[n].off.z

    # Position Real to Vector
    marr[n].off = c4d.Vector(x,y,z)

#########################################
    #Part 2: Affecting all clones
    for i in range(cnt):
        x = marr[i].off.x 
        y = 20+i*5
        z = marr[i].off.z
        marr[i].off = c4d.Vector(x,y,z)



    moData.SetArray(c4d.MODATA_MATRIX, marr, hasField)
    return True