import c4d

def main():
    moData = c4d.modules.mograph.GeGetMoData(op)
    marr = moData.GetArray(c4d.MODATA_MATRIX)

    cloner = moData.GetGenerator()
    cached = cloner.GetCache()
    cubes = cached.GetChildren()

    pos_y = 0
    for i in range(cnt)

        # Thickness
        innerRing = innerRing
        outerRing =  outerRing
        ringInnerRadius = c4d.PRIM_TORUS_INNERRAD 
        ringStepFactor = 2
        outerRingThickness =  thickness * i * ringStepFactor

        # GetRad() : bounding box radius (x/y/z) of the object
    
        # Ring Radii
        innerRingSize = marr[i].GetRad().y
        outerRingSize = marr[i+1].GetRad().y
        outerRingInnerRadius = outerRingSize - thickness 
        scaleFactor = outerRingInnerRadius/innerRingSize
        marr[i+1].Scale(scaleFactor)
        

    moData.SetArray(c4d.MODATA_MATRIX, marr, False)
    return True