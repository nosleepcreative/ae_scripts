
import c4d
    import random 

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
    # Uniform Scale
    # marr[0].Scale(1.5)

    # Loop: Random Scaling
    for i in range(cnt):
        x = random.uniform(0.2,1) 
        y = random.uniform(0.2,1)
        z = random.uniform(0.2,1)
        vect = c4d.Vector(x,y,z)
      #  marr[i].Scale(float(i/10))
        marr[i].Scale(vect)


    moData.SetArray(c4d.MODATA_MATRIX, marr, hasField)
    return True