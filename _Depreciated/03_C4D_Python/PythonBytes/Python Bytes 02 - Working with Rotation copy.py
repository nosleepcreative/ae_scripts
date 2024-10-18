import c4d

def main() -> bool:
    # Called when the effector is executed to set MoGraph data. Similar to EffectorData::ModifyObject in C++.
    moData = c4d.modules.mograph.GeGetMoData(op)
    if moData is None:
        return False

    cnt = moData.GetCount()
    marr = moData.GetArray(c4d.MODATA_MATRIX)

    hasField = op[c4d.FIELDS].HasContent()
    fall = moData.GetFalloffs()
    
    #####
    rot_x = c4d.utils.MatrixRotX(c4d.utils.Rad(45))
    rot_y = c4d.utils.MatrixRotY(c4d.utils.Rad(30))
    rot_z = c4d.utils.MatrixRotZ(c4d.utils.Rad(45))
    
    # Single Axis
    marr[6] *= rot_x
    
    # Multiple Axes with HPB to Matrix
    r_x = c4d.utils.Rad(11)
    r_y = 0
    r_z = c4d.utils.Rad(18)
    
    vect = c4d.Vector(r_x, r_y, r_z)
    rotation = c4d.utils.HPBToMatrix(vect,5)
    marr[6] *= rotation


    moData.SetArray(c4d.MODATA_MATRIX, marr, hasField)
    return True