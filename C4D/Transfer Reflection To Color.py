"""
Transfer Reflection To Color, 11 November 2024

Objective:
Automates the process of converting shaders from Kitbash 3D assets to be compatible with Chaos Corona render engine.
This will save time by eliminating the need to manually adjust hundreds of materials in the scene.

Scope:
This script iterates over all materials in the current Cinema 4D scene.
It checks each material for a texture in the Reflectance - Layer Color channel.
If a texture exists, it copy this texture to the Color channel and disables Reflectance.


"""

import c4d
doc: c4d.documents.BaseDocument

def main():
    # Loop through all materials in the document, processing only materials with reflectance layers
    for material in doc.GetMaterials():
        if not material.CheckType(c4d.Mmaterial):
            continue

        # Iterate over each reflection layer to find the first one that contains a color shader
        i: int = 0
        layer: c4d.ReflectionLayer | None = material.GetReflectionLayerIndex(i)

        while(layer):
            # Get the ID of the color shader in the reflection layer
            pid: int = layer.GetDataID() + c4d.REFLECTION_LAYER_COLOR_TEXTURE
            colorShader: c4d.BaseShader | None = material[pid]

            # Move to the next layer if no color shader is found in the current layer
            i += 1
            layer = material.GetReflectionLayerIndex(i)

            if not colorShader:
                continue  # Continue searching if the color shader is absent
            
            # Begin undo actions for safer changes to the document
            doc.StartUndo()
            doc.AddUndo(c4d.UNDO_CHANGE, material)
            
            # Enable the Color channel and disable the Reflection channel in the material
            material[c4d.MATERIAL_USE_COLOR] = True 
            material[c4d.MATERIAL_USE_REFLECTION] = False
            
            # Clear the shader slot in the reflection layer to avoid multiple references to the same shader
            material[pid] = None
            
            # Assign the found color shader to the Color channel in the material
            material[c4d.MATERIAL_COLOR_SHADER] = colorShader #

            doc.EndUndo()
            break
    
    # Push an update event
    c4d.EventAdd()

if __name__=='__main__':
    main()