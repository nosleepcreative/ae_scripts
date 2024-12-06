# https://plugincafe.maxon.net/topic/14227/get-modata_size-of-mograph-particles-to-build-stacks-of-geometry/4

"""Simple example for an effector that 'stacks' clones by their particle geometry size.

This can get quite complicated when supposed to be done with arbitrary particle transforms where
particles are rotated in odd angles. This is just a naïve variant stacking along the y-axis,
assuming all particles to have an orientation of (0, y, 0), i.e., only allowing for rotations around
the stacking axis.

Your code had basically the correct idea, multiply the particle scale by the actual geometry size,
but had some problems in the details.
"""
import c4d
import math
import typing

from c4d.modules import mograph

op: c4d.BaseObject # The Python effector object.

# The geometry associated with a Mograph particle is stored as a floating point value, to retrieve
# the index of the cloner child associated with that floating point number, this formula must be
# used.
CloneOffset2Index: typing.Callable[[float, int], int] = lambda offset, count: (
    int(math.floor(c4d.utils.ClampValue(offset * count, 0, count - 1)))
)

def main() -> None:
    """Implements the 'stacking' effector.
    """
    # Get Mograph data, the particle matrices, and the particle clone offsets.
    moData: mograph.MoData = mograph.GeGetMoData(op)
    cloneMatrices: list[c4d.Matrix] = moData.GetArray(c4d.MODATA_MATRIX)
    cloneOffsets: list[float] = moData.GetArray(c4d.MODATA_CLONE)
    if len(cloneMatrices) != len(cloneOffsets):
        raise IndexError("Clone matrix and index arrays are not of equal length.")

    # Get the cloner and its children, the to be cloned geometry.
    cloner: c4d.BaseObject = moData.GetGenerator()
    cloneGeometries: list[c4d.BaseObject] = cloner.GetChildren()
    cloneGeometriesCount: int = len(cloneGeometries)

    # Convert cloneOffsets to integer values. cloneIndices[n] will now contain the child index
    # for cloneMatrices[n], i.e., cloneGeometries[cloneIndices[n]] is the geometry for the particle
    # n with the matrix cloneMatrices[n].
    cloneIndices: list[int] = [
        CloneOffset2Index(offset, cloneGeometriesCount) for offset in cloneOffsets]

    # Apart from not properly dealing with the clone geometry, your code had also some math problems
    # in the loop.

    # The offset vector for the clones, so that we can collect the 'stacking' information.
    offset: c4d.Vector = c4d.Vector()

    # Iterate over all clones as clone matrix, clone geometry index pairs.
    for cloneMatrix, cloneIndex in zip(cloneMatrices, cloneIndices):
        # Get the y-scale of the particle and half the size of the geometry bounding box along
        # the y-axis and construct a vector with it, representing half the height of the actual
        # particle geometry.
        particleScaleY: float = cloneMatrix.GetScale().y
        geometryRadiusY: float = cloneGeometries[cloneIndex].GetRad().y
        localOffset: c4d.Vector = c4d.Vector(0, particleScaleY * geometryRadiusY, 0)

        # Offset the clone by half its height on top of the current offset, so that it sits on top
        # of whatever was below it. And after that, increment the offset by twice that value, as we
        # want to respect the full particle in the offset.
        cloneMatrix.off = offset + localOffset
        offset += localOffset * 2

        # What we did here in the last step is a very lack-lustre implementation, as it assumes the
        # origin of a particle geometry to always be located on the arithmetic mean of its bounding
        # box minima/maxima, i.e, that it always sits "in the middle". This assumption holds true
        # for things like primitive generators, but will quickly fail on "real world" geometry which
        # can place its origin almost anywhere. To make this effector more robust, you will have to
        # evaluate the delta between the origin of the geometry in world coordinates and the bounding
        # box origin (BaseObject.GetMp()) in world coordinates and respect that in your calculations.
        # I left this here out because I wanted the example to be A. simple, and because B. we cannot
        # provide full solutions.

        # What has also not been respected in this script, is the orientation of particles, you could
        # for example want to stack cubes which are "balancing" on one of their edges, this here only
        # works for staccking geometry on the top and bottom faces of their bounding boxes.

    moData.SetArray(c4d.MODATA_MATRIX, cloneMatrices, False)
    return True