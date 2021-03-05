<?php


namespace App\Admin;


use App\Entity\Category;
use App\Entity\Product;
use Doctrine\DBAL\Types\FloatType;
use phpDocumentor\Reflection\Types\Float_;
use Sonata\AdminBundle\Admin\AbstractAdmin ;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

final class ProductAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->with('content', ['class' => 'col-md-9'])
        ->add('name', TextType::class)
        ->add('price', TextType::class )
            ->end()
            ->with('Meta Data', ['class' => 'col-md-3'])
        ->add('category',EntityType::class,[
            'class' => Category::class,
            'choice_label' => 'name',
        ])
        ->end();
    }
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('name');
        $datagridMapper->add('price');

    }
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('name')
        ->add('price')
        ->add('category.name');
       // $listMapper->add('category');
    }
    public function toString($object)
    {
        return ($object instanceof Product) ? $object -> getName() : 'Product';
    }
}