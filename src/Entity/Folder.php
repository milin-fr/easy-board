<?php

namespace App\Entity;

use App\Repository\FolderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=FolderRepository::class)
 */
class Folder
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @ORM\OneToMany(targetEntity=UploadedFile::class, mappedBy="folder")
     */
    private $uploadedFiles;

    public function __construct()
    {
        $this->uploadedFiles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return Collection|UploadedFile[]
     */
    public function getUploadedFiles(): Collection
    {
        return $this->uploadedFiles;
    }

    public function addUploadedFile(UploadedFile $uploadedFile): self
    {
        if (!$this->uploadedFiles->contains($uploadedFile)) {
            $this->uploadedFiles[] = $uploadedFile;
            $uploadedFile->setFolder($this);
        }

        return $this;
    }

    public function removeUploadedFile(UploadedFile $uploadedFile): self
    {
        if ($this->uploadedFiles->contains($uploadedFile)) {
            $this->uploadedFiles->removeElement($uploadedFile);
            // set the owning side to null (unless already changed)
            if ($uploadedFile->getFolder() === $this) {
                $uploadedFile->setFolder(null);
            }
        }

        return $this;
    }
}
