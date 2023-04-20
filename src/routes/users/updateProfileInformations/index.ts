import { Request, Response } from 'express'
import { ProfileDTO } from '../../../@types/profile'
import { updateProfileInformation as updateProfile } from '../../../services/database/UserTableUtils'

export const updateProfileInformation = async (req: Request, res: Response) => {
  const { description, id, image, nickname }: ProfileDTO = req.body
  const profileUpdated = await updateProfile({
    description,
    id,
    image,
    nickname
  })

  if (profileUpdated != null) {
    return res
      .status(200)
      .send({ message: 'success', profile: profileUpdated.profile })
  } else {
    return res
      .status(400)
      .send({ message: 'Not possibility updated informations' })
  }
}
